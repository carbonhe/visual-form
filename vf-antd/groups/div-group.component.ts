import { Component } from '@angular/core';
import { GroupComponent, VfFormGroup } from 'visual-form/renderer/types';

@Component({
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
export class DivGroupComponent implements GroupComponent {
  group: VfFormGroup<any>;
}
