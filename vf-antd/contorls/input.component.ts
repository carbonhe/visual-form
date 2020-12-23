import { Component } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';

@Component({
  template: ` <input nz-input type="text" [formControl]="control" /> `,
})
export class InputComponent implements ControlComponent {
  readonly control: VfFormControl<any>;
}
