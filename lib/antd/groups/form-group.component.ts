import { Component } from '@angular/core';
import { GroupComponent, VfFormGroup } from '../../core/renderer/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';

@Component({
  template: `
    <div nz-form [nzLayout]="group.props.layout">
      <ng-content></ng-content>
    </div>
  `,
})
export class FormGroupComponent implements GroupComponent<FormGroupProps> {
  group: VfFormGroup<FormGroupProps>;
}

export interface FormGroupProps {
  layout: NzFormLayoutType;
}
