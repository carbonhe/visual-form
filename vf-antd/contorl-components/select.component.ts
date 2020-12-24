import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';
import { NzSelectModeType, NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  template: `
    <nz-select [formControl]='control' [nzMode]='props.selectMode' [nzOptions]='props.options'
               [nzAllowClear]='props.allowClear'></nz-select> `
})
export class SelectComponent implements ControlComponent<SelectProps>, OnInit {
  control: VfFormControl<SelectProps>;
  props: SelectProps;

  ngOnInit(): void {
    this.props = { ...{ allowClear: false, selectMode: 'default', options: [] }, ...this.control.props };
  }
}

export class SelectProps {
  options: NzSelectOptionInterface[];
  allowClear?: boolean;
  selectMode?: NzSelectModeType;
}
