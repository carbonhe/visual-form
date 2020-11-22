import { Component, ComponentRef, Inject, Input, Type } from '@angular/core';
import { FORM_RENDER_COMPONENT, FormRender, PropertyModel } from '../spi/component-provider';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'vf-render',
  template: ` <ng-template [cdkPortalOutlet]="formPortal" (attached)="attached($event)"></ng-template>`,
})
export class RenderComponent {
  @Input()
  controls: PropertyModel[];

  formPortal: ComponentPortal<FormRender>;

  constructor(@Inject(FORM_RENDER_COMPONENT) private formRenderComponent: Type<FormRender>) {
    this.formPortal = new ComponentPortal<FormRender>(formRenderComponent);
  }

  attached(componentRef: ComponentRef<FormRender>) {
    componentRef.instance.controls = this.controls;
  }
}
