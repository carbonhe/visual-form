import { Component } from '@angular/core';
import { GroupComponent, VfFormGroup } from 'visual-form/renderer/types';

@Component({
  template: `
    <nz-row>
      <ng-content></ng-content>
    </nz-row>
  `,
})
export class GridGroupComponent implements GroupComponent {
  group: VfFormGroup<any>;
}
