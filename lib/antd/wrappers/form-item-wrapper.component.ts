import { Component, OnInit } from '@angular/core';
import { WrapperComponent } from '../../core/renderer/types';
import { ControlSetting } from '../../core/workspace/types';
import { NzColDirective } from 'ng-zorro-antd/grid';

@Component({
  template: `
    <nz-form-item>
      <nz-form-label [nzRequired]="props.required" [nzSpan]="props.labelSpan" [nzFor]="props.id" [nzTooltipTitle]="props.description">
        {{ props.title }}
      </nz-form-label>
      <nz-form-control [nzSpan]="props.controlSpan">
        <ng-content></ng-content>
      </nz-form-control>
    </nz-form-item>
  `,
})
export class FormItemWrapperComponent extends NzColDirective implements WrapperComponent<FormItemProps>, OnInit {
  props: FormItemProps;

  ngOnInit() {
    super.ngOnInit();
    this.nzSpan = this.props.span;
    this.setHostClassMap();
  }
}

export interface FormItemProps extends ControlSetting {
  description?: string;
  labelSpan: number;
  controlSpan: number;
}
