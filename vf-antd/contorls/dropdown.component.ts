import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { isNotNil } from 'ng-zorro-antd/core/util';

@Component({
  template: ` <nz-select [formControl]="control" [nzOptions]="props.options" [nzAllowClear]="props.allowClear"></nz-select> `,
})
export class DropdownComponent implements ControlComponent<DropdownProps>, OnInit {
  control: VfFormControl<DropdownProps>;
  props: DropdownProps;

  ngOnInit(): void {
    this.props = { ...{ allowClear: false }, ...this.control.props };

    if (isNotNil(this.props.defaultValue)) {
      this.control.setValue(this.props.defaultValue);
    }
  }
}

export class DropdownProps {
  options: NzSelectOptionInterface[];
  allowClear?: boolean;
  defaultValue?: any;
}
