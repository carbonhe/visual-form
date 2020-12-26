import { Component, OnInit } from '@angular/core';
import { ControlComponent, VfFormControl } from '../../core/renderer/types';
import { NzDateMode } from 'ng-zorro-antd/date-picker';

@Component({
  template: `
    <nz-range-picker
      [nzMode]="props.dateMode"
      [formControl]="control"
      [nzShowTime]="props.dateMode === 'time'"
      *ngIf="props.range; else datePickTpl"
    ></nz-range-picker>
    <ng-template #datePickTpl>
      <nz-date-picker [nzMode]="props.dateMode" [nzShowTime]="props.dateMode === 'time'" [formControl]="control"></nz-date-picker>
    </ng-template>
  `,
})
export class DateComponent implements ControlComponent<DateProps>, OnInit {
  control: VfFormControl<DateProps>;
  props: DateProps;

  ngOnInit(): void {
    this.props = {
      ...{
        range: false,
      },
      ...this.control.props,
    };
  }
}

export interface DateProps {
  readonly range: boolean;
  readonly dateMode: NzDateMode;
}
