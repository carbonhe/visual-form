import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ControlSetting, VF_PATCHES } from '../workspace/types';
import { ControlComponent, VfFormControl, VfFormGroup, VfTemplateType } from './types';
import { PluginService } from '../plugable/plugin.service';
import { FormGroup } from '@angular/forms';
import { PATCH_CONTEXT_CONTRIBUTORS, PatchContext, PatchContextContributor } from 'visual-form/plugable/plugable';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'vf-container',
  template: ` <div [vf]="vf" (onComponentRendered)="onComponentRendered($event)"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VfContainerComponent implements OnInit, AfterViewInit {
  @Input() controls: ControlSetting[] = [];

  @Output() renderCompleted = new EventEmitter<FormGroup>();

  private componentRendered$ = new Subject<ComponentRef<VfTemplateType>>();

  vf: VfFormGroup<any>;

  constructor(
    private pluginService: PluginService,
    private injector: Injector,
    @Inject(PATCH_CONTEXT_CONTRIBUTORS) @Optional() private patchContextContributors: PatchContextContributor[]
  ) {}

  ngOnInit(): void {
    let contributedContext = {};
    if (this.patchContextContributors) {
      this.patchContextContributors.forEach(contributor => {
        contributedContext = { ...contributedContext, ...contributor.contribute() };
      });
    }
    const vfControls = {};
    this.controls.forEach(controlSetting => {
      const control = new VfFormControl(
        this.pluginService.findControl(controlSetting.indicatorId),
        this.pluginService.platform.defaultWrapperComponent,
        controlSetting
      );

      const rendered$ = this.componentRendered$.pipe(
        filter(ref => isInstanceOfControlComponent(ref.instance)),
        map(e => void e)
      );
      this.applyPatch(controlSetting, {
        control: control,
        rendered$: rendered$,
        extra: contributedContext,
        ...this.resolveContextServices(),
      });
      vfControls[controlSetting.id] = control;
    });

    this.vf = new VfFormGroup<any>(this.pluginService.platform.rootGroupComponent, vfControls);
  }

  onComponentRendered(componentRef: ComponentRef<VfTemplateType>) {
    this.componentRendered$.next(componentRef);
  }

  ngAfterViewInit(): void {
    this.renderCompleted.emit(this.vf);
  }

  private resolveContextServices() {
    const httpClient = this.injector.get(HttpClient, mockService(HttpClient));
    return { httpClient: httpClient };
  }

  private applyPatch(controlSetting: ControlSetting, context: PatchContext) {
    const patches = controlSetting[VF_PATCHES];
    if (patches instanceof Set) {
      patches.forEach(propertyKey => {
        const property = this.pluginService.getProperty(propertyKey);
        if (!property) {
          throw new Error(`The property which named [${propertyKey}] not found`);
        }
        property.patch(controlSetting[propertyKey], context);
      });
    }
  }
}

function mockService(type: Function) {
  return {
    errorMessage: `This is a mock object! You don't seem to provide service of [${type.name}], please inject it first.`,
  };
}

function isInstanceOfControlComponent(instance: VfTemplateType): instance is ControlComponent {
  return instance.hasOwnProperty('control') && instance['control'] instanceof VfFormControl;
}
