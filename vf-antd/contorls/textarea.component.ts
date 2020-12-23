import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from 'visual-form/renderer/types';

@Component({
  template: ` <textarea [formControl]="control" nz-input [rows]="props.rows"></textarea> `,
})
export class TextareaComponent implements ControlComponent<TextareaProps>, OnInit {
  control: VfFormControl<TextareaProps>;
  props: TextareaProps;

  ngOnInit(): void {
    this.props = { ...{ rows: 4 }, ...this.control.props };
  }
}

export interface TextareaProps {
  rows?: number;
}
