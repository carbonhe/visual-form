import { Component } from '@angular/core';
import { GroupComponent, VfFormGroup } from '../../core/renderer/types';
import { NzRowDirective } from 'ng-zorro-antd/grid';

@Component({
  template: ` <ng-content></ng-content>`,
})
export class GridGroupComponent extends NzRowDirective implements GroupComponent {
  group: VfFormGroup<any>;
}
