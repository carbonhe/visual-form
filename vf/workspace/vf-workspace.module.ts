import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './components/workspace.component';
import { ComponentPanelComponent } from './components/component-panel.component';
import { LayoutPanelComponent } from './components/layout-panel.component';
import { PropertyPanelComponent } from './components/property-panel.component';
import { IndicatorComponent } from './components/indicator.component';

import { SortablejsModule } from 'ngx-sortablejs';
import { PortalModule } from '@angular/cdk/portal';
import { InternalRenderComponent, RenderComponent } from './components/render.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    RenderComponent,
    ComponentPanelComponent,
    LayoutPanelComponent,
    PropertyPanelComponent,
    IndicatorComponent,
    InternalRenderComponent
  ],
  exports: [WorkspaceComponent],
  imports: [CommonModule, SortablejsModule, PortalModule]
})
export class VfWorkspaceModule {
}
