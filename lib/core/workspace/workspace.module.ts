import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './components/workspace.component';
import { ComponentPanelComponent } from './components/component-panel.component';
import { LayoutPanelComponent } from './components/layout-panel.component';
import { PropertyPanelComponent } from './components/property-panel.component';
import { IndicatorComponent } from './components/indicator.component';

import { SortablejsModule } from 'ngx-sortablejs';
import { PortalModule } from '@angular/cdk/portal';
import { DeleteIconComponent } from './icons/delete.component';
import { HandleIconComponent } from './icons/handle.component';
import { VfRendererModule } from '../../core/renderer/renderer.module';

@NgModule({
  declarations: [
    HandleIconComponent,
    DeleteIconComponent,
    WorkspaceComponent,
    ComponentPanelComponent,
    LayoutPanelComponent,
    PropertyPanelComponent,
    IndicatorComponent,
  ],
  exports: [WorkspaceComponent],
  imports: [CommonModule, SortablejsModule, PortalModule, VfRendererModule],
})
export class VfWorkspaceModule {}
