import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  template: `
    <nz-input-group *ngFor='let option of options' nzSize='small'>
      <nz-row nzGutter='8'>
        <nz-col nzSpan='10'>
          <input type='text' [(ngModel)]='option.label' nz-input>
        </nz-col>
        <nz-col nzSpan='10'>
          <input type='text' [(ngModel)]='option.value' nz-input>
        </nz-col>
      </nz-row>
    </nz-input-group>
  `
})
export class OptionSettingComponent implements ControlComponent<OptionSettingProps>, OnInit {


  control: VfFormControl<OptionSettingProps>;

  options: NzSelectOptionInterface[] = [];

  props: OptionSettingProps;

  ngOnInit(): void {
    this.props = this.control.props;

    this.options = this.props.defaultOptions ?? this.options;

  }

}

export interface OptionSettingProps {
  defaultOptions?: NzSelectOptionInterface[]
}
