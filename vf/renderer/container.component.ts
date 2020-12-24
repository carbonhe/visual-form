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
import { ControlComponent, VfComponentType, VfFormControl, VfFormGroup } from './types';
import { PluginService } from '../plugable/plugin.service';
import { FormGroup } from '@angular/forms';
import {
  PATCH_CONTEXT_CONTRIBUTORS,
  PATCH_CONTRIBUTORS,
  PatchContext,
  PatchContextContributor,
  PatchContributor,
} from 'visual-form/plugable/plugable';
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

  private componentRendered$ = new Subject<ComponentRef<VfComponentType>>();

  vf: VfFormGroup<any>;

  constructor(
    private pluginService: PluginService,
    private injector: Injector,
    @Inject(PATCH_CONTEXT_CONTRIBUTORS) @Optional() private patchContextContributors: PatchContextContributor[],
    @Inject(PATCH_CONTRIBUTORS) @Optional() private patchContributors: PatchContributor[]
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
        {
          ...controlSetting,
        }
      );

      const rendered$ = this.componentRendered$.pipe(
        filter(ref => isInstanceOfControlComponent(ref.instance)),
        map(_ => undefined)
      );
      const patchContext = {
        control,
        rendered$,
        extra: contributedContext,
        ...this.resolveContextServices(),
      };
      this.applyPatch(controlSetting, patchContext);

      if (this.patchContributors) {
        this.patchContributors.forEach(contributor => contributor.patch(controlSetting, patchContext));
      }
      vfControls[controlSetting.id] = control;
    });

    this.vf = new VfFormGroup<any>(
      this.pluginService.platform.rootGroup.component,
      vfControls,
      this.pluginService.platform.rootGroup.props
    );
  }

  onComponentRendered(componentRef: ComponentRef<VfComponentType>) {
    this.componentRendered$.next(componentRef);
  }

  ngAfterViewInit(): void {
    this.renderCompleted.emit(this.vf);
  }

  private resolveContextServices() {
    const httpClient = this.injector.get(HttpClient);
    return { httpClient };
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

function isInstanceOfControlComponent(instance: VfComponentType): instance is ControlComponent {
  return instance.hasOwnProperty('control') && instance['control'] instanceof VfFormControl;
}
