import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { PluginService } from '../plugable/plugin.service';
import { DragDropService } from '../services/drag-drop.service';

@Component({
  selector: 'vf-render',
  template: `
    <ng-template [cdkPortalOutlet]="formPortal" (attached)="attached($event)"></ng-template>`
})
export class RenderComponent {
  @Input()
  controls: any[];

  formPortal: ComponentPortal<any>;

  constructor(private pluginService: PluginService) {
    this.formPortal = new ComponentPortal<any>(this.pluginService.rendererType);
  }

  attached(componentRef: ComponentRef<any>) {
    componentRef.instance.controls = this.controls;
  }
}


@Component({
  template: ``
})
export class InternalRenderComponent implements OnInit {
  constructor(private dcs: DragDropService,
              private pluginService: PluginService) {
  }

  ngOnInit(): void {
  }


}
