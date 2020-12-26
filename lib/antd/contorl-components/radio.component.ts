import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from '../../core/renderer/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  template: `
    <nz-radio-group [formControl]="control">
      <label nz-radio [nzValue]="option.value" *ngFor="let option of props.options">{{ option.label }}</label>
    </nz-radio-group>
  `,
})
export class RadioComponent implements ControlComponent<RadioProps>, OnInit {
  control: VfFormControl<RadioProps>;
  props: RadioProps;

  ngOnInit(): void {
    this.props = { ...{ options: [] }, ...this.control.props };
  }
}

export interface RadioProps {
  options: Pick<NzSelectOptionInterface, 'label' | 'value'>[];
}
