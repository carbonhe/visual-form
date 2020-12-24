import { Component } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  template: ` <option-setting [formControl]="control"></option-setting>`,
})
export class OptionSettingComponent implements ControlComponent<OptionSettingProps> {
  control: VfFormControl<OptionSettingProps>;
}

export interface OptionSettingProps {
  defaultOptions?: NzSelectOptionInterface[];
}
