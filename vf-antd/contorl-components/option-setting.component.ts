import { Component } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';

@Component({
  template: `
    <option-setting [formControl]='control'></option-setting>`
})
export class OptionSettingComponent implements ControlComponent {
  control: VfFormControl<any>;
}


