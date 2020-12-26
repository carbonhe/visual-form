import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from '../../core/renderer/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  template: ` <checkbox [checkboxOptions]="props.options" [formControl]="control"></checkbox>`,
})
export class CheckboxComponent implements ControlComponent<CheckboxProps>, OnInit {
  control: VfFormControl<CheckboxProps>;

  props: CheckboxProps;

  ngOnInit(): void {
    this.props = { ...{ options: [] }, ...this.control.props };
  }
}

export interface CheckboxProps {
  options: Pick<NzSelectOptionInterface, 'label' | 'value'>[];
}
