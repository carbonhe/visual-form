import { Component } from '@angular/core';
import { FormControlTemplate, VfFormControl } from 'visual-form/renderer/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  template: `
    <nz-select [formControl]='control' [nzOptions]='control.props.options'></nz-select>
  `
})
export class DropdownComponent implements FormControlTemplate<DropdownProps> {
  control: VfFormControl<DropdownProps>;
}

export class DropdownProps {
  options: NzSelectOptionInterface[];
}
