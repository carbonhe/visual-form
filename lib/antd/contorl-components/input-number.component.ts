import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from '../../core/renderer/types';

@Component({
  template: ` <nz-input-number [nzMin]="props.min" [nzMax]="props.max" [formControl]="control"></nz-input-number> `,
  styles: [
    `
      nz-input-number {
        width: 100%;
      }
    `,
  ],
})
export class InputNumberComponent implements ControlComponent<InputNumberProps>, OnInit {
  readonly control: VfFormControl<InputNumberProps>;
  props: InputNumberProps;

  ngOnInit(): void {
    this.props = {
      ...{
        min: Number.NEGATIVE_INFINITY,
        max: Number.POSITIVE_INFINITY,
      },
      ...this.control.props,
    };
  }
}

export interface InputNumberProps {
  min: number;
  max: number;
}
