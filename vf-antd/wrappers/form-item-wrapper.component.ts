import { Component } from '@angular/core';
import { FormControlWrapperTemplate } from 'visual-form/renderer/types';
import { CommonControlSetting } from 'visual-form/workspace/types';


@Component({
  template: `
    <nz-col [nzSpan]='props.span'>
      <nz-form-item>
        <nz-form-label [nzSpan]='6' [nzFor]='props.id' [nzTooltipTitle]='props.description'>
          {{props.title}}
        </nz-form-label>
        <nz-form-control [nzSpan]='18'>
          <ng-content></ng-content>
        </nz-form-control>
      </nz-form-item>
    </nz-col>
  `
})
export class FormItemWrapperComponent implements FormControlWrapperTemplate<FormItemProps> {
  props: FormItemProps;
}


interface FormItemProps extends CommonControlSetting {
  description?: string;
}
