import { Component, ComponentRef, OnInit } from '@angular/core';
import { DragConnectionService } from '../services/drag-connection.service';
import { AbstractFormGroupComponent } from '..';

@Component({
  selector: 'vf-property-panel',
  template: `
    <div class="property-container">
      <ng-template [cdkPortalOutlet]="dcs.currentCommonPropertyPortal" (attached)="attached($event)"></ng-template>
      <ng-template [cdkPortalOutlet]="dcs.currentPropertyPortal" (attached)="attached($event)"></ng-template>
    </div>
  `,
  styleUrls: [`./styles.less`],
})
export class PropertyPanelComponent implements OnInit {
  constructor(public dcs: DragConnectionService) {}

  ngOnInit(): void {}

  attached(componentRef: ComponentRef<any>) {
    (componentRef.instance as AbstractFormGroupComponent).model = this.dcs.selectedControl;
  }
}

export class PropertyPanelConfiguration {}
