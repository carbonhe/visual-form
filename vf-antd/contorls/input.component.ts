import { Component } from '@angular/core';
import { FormControlTemplate, VfFormControl } from 'visual-form/renderer/types';

@Component({
  template: `
    <input nz-input type='text' [formControl]='control' />
  `
})
export class InputComponent implements FormControlTemplate {
  readonly control: VfFormControl<any>;
}


