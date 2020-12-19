import { Component } from '@angular/core';
import { FormGroupTemplate, VfFormGroup } from 'visual-form/renderer/types';

@Component({
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `
})
export class DivGroupComponent implements FormGroupTemplate {
  group: VfFormGroup;
}
