import { Component } from '@angular/core';
import { FormGroupTemplate, VfFormGroup } from 'visual-form/renderer/types';

@Component({
  template: `
    <nz-row>
      <ng-content></ng-content>
    </nz-row>
  `
})
export class GridGroupComponent implements FormGroupTemplate {
  group: VfFormGroup<any>;
}
