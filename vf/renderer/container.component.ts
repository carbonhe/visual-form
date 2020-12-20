import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlSetting } from '../workspace/types';
import { VfFormControl, VfFormGroup } from './types';
import { PluginService } from '../plugable/plugin.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vf-container',
  template: `
    <div [vf]='vf'></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VfContainerComponent implements OnInit {
  @Input() controls: ControlSetting[] = [];

  @Output() renderCompleted = new EventEmitter<FormGroup>();

  vf: VfFormGroup;


  constructor(private pluginService: PluginService) {

  }

  ngOnInit(): void {
    const vfControls = {};
    this.controls.forEach(control => {
      vfControls[control.id] = new VfFormControl(this.pluginService.findControl(control.indicatorId), this.pluginService.platform.defaultControlWrapper, control);
    });

    this.vf = new VfFormGroup<any>(this.pluginService.platform.rootGroup, vfControls);
    this.renderCompleted.emit(this.vf);
  }


}
