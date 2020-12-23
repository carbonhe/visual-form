import { Component } from '@angular/core';
import { WrapperComponent } from 'visual-form/renderer/types';
import { CommonControlSetting } from 'visual-form/workspace/types';

@Component({
  template: `
    <nz-col [nzSpan]='props.span'>
      <nz-form-item>
        <nz-form-label [nzRequired]='props.required' [nzSpan]='props.labelSpan' [nzFor]='props.id'
                       [nzTooltipTitle]='props.description'>
          {{ props.title }}
        </nz-form-label>
        <nz-form-control [nzSpan]='props.controlSpan'>
          <ng-content></ng-content>
        </nz-form-control>
      </nz-form-item>
    </nz-col>
  `
})
export class FormItemWrapperComponent implements WrapperComponent<FormItemProps> {
  props: FormItemProps;
}

export interface FormItemProps extends CommonControlSetting {
  description?: string;
  labelSpan: number;
  controlSpan: number;
}
