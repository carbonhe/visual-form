import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlSetting, VF_PATCHES } from '../workspace/types';
import { VfFormControl, VfFormGroup } from './types';
import { PluginService } from '../plugable/plugin.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vf-container',
  template: ` <div [vf]="vf"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VfContainerComponent implements OnInit, AfterViewInit {
  @Input() controls: ControlSetting[] = [];

  @Output() renderCompleted = new EventEmitter<FormGroup>();

  vf: VfFormGroup<any>;

  constructor(private pluginService: PluginService) {}

  ngOnInit(): void {
    const vfControls = {};
    this.controls.forEach(controlSetting => {
      const control = new VfFormControl(
        this.pluginService.findControl(controlSetting.indicatorId),
        this.pluginService.platform.defaultControlWrapper,
        controlSetting
      );
      this.applyPatch(controlSetting, control);
      vfControls[controlSetting.id] = control;
    });

    this.vf = new VfFormGroup<any>(this.pluginService.platform.rootGroup, vfControls);
  }

  ngAfterViewInit(): void {
    this.renderCompleted.emit(this.vf);
  }

  private applyPatch(controlSetting: ControlSetting, control: VfFormControl<any>) {
    const patches = controlSetting[VF_PATCHES];
    if (patches instanceof Set) {
      patches.forEach(propertyKey => {
        const property = this.pluginService.getProperty(propertyKey);
        if (!property) {
          throw new Error(`The property which named [${propertyKey}] not found`);
        }
        property.patch(controlSetting[propertyKey], control);
      });
    }
  }
}
