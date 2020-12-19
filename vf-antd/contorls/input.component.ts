import { Component } from '@angular/core';
import { FormControlTemplate, VfFormControl } from 'visual-form/renderer/types';

@Component({
  template: `
    <input nz-input [type]='control.props?.type' [formControl]='control' />
  `
})
export class InputComponent implements FormControlTemplate<InputProps> {
  readonly control: VfFormControl<InputProps>;
}

export interface InputProps {
  type: string;
}
