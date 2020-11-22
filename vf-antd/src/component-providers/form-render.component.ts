import { ChangeDetectionStrategy, Component, ComponentRef, Inject } from '@angular/core';
import { COMPONENT_PROVIDERS, ComponentProvider, FormRender, PropertyModel } from 'visual-form';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  template: `
    <form nz-form>
      <nz-row>
        <nz-col [nzSpan]="control.span" *ngFor="let control of controls">
          <nz-form-item>
            <nz-form-label [nzTooltipTitle]="control.description" [nzFor]="control.id">{{ control.title }}</nz-form-label>
            <nz-form-control>
              <ng-template [cdkPortalOutlet]="resolveComponentPortal(control.componentId)" (attached)="attached($event)"></ng-template>
            </nz-form-control>
          </nz-form-item>
        </nz-col>
      </nz-row>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRenderComponent implements FormRender {
  constructor(
    @Inject(COMPONENT_PROVIDERS)
    private componentProviders: ComponentProvider<any, any, any>[]
  ) {}

  controls: PropertyModel[];

  resolveComponentPortal(id: string) {
    const componentType = this.componentProviders.find(e => e.getId() === id).getComponentType();
    return new ComponentPortal(componentType);
  }

  attached(componentRef: ComponentRef<any>) {}
}
