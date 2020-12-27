import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { ControlSetting, VF_PATCHES } from '../workspace/types';
import { isInstanceOfControlComponent, VfComponentType, VfFormControl, VfFormGroup } from './types';
import { PluginService } from '../plugable/plugin.service';
import { FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { VfRenderer } from './renderer';
import { Patcher } from './patcher';
import { PatchContext } from '../plugable/plugable';

@Component({
  selector: 'vf',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VfRenderer],
})
export class RendererComponent implements OnInit, AfterViewInit {
  @Input() controls: ControlSetting[] = [];

  @Output() renderCompleted = new EventEmitter<FormGroup>();

  @Output() componentRendered = new EventEmitter<VfComponentType>();

  private componentRendered$ = new Subject<ComponentRef<VfComponentType>>();

  vf: VfFormGroup<any>;

  constructor(
    private pluginService: PluginService,
    private injector: Injector,
    private renderer: VfRenderer,
    private viewContainer: ViewContainerRef,
    private patcher: Patcher
  ) {}

  ngOnInit(): void {
    this.viewContainer.clear();
    this.renderer.componentRendered$.subscribe(r => this.componentRendered$.next(r));
    this.render();
  }

  private render() {
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
        extra: this.patcher.extraPatchContext,
        ...this.resolveContextServices(),
      };
      this.applyPatch(controlSetting, patchContext);

      this.patcher.applyExtraPatches(controlSetting, patchContext);

      vfControls[controlSetting.id] = control;
    });

    this.vf = new VfFormGroup<any>(
      this.pluginService.platform.rootGroup.component,
      vfControls,
      this.pluginService.platform.rootGroup.props
    );
    this.renderer.render(this.viewContainer, this.vf);
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
