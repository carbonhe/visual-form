import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { VfWorkspaceModule } from 'visual-form';
import { PluginService } from 'visual-form/plugable/plugin.service';
import { VfIndicator, VfPanel, VfPlatform } from 'visual-form/plugable/plugable';
import { InputComponent } from './contorls/input.component';
import { FormControlTemplate } from 'visual-form/renderer/types';
import { indicators } from './indicators';
import { DivGroupComponent } from 'visual-form-antd/groups/div-group.component';
import { FormItemWrapperComponent } from 'visual-form-antd/wrappers/form-item-wrapper.component';
import { GridGroupComponent } from 'visual-form-antd/groups/grid-group.component';

const controls = [InputComponent];
const groups = [DivGroupComponent, GridGroupComponent];
const wrappers = [FormItemWrapperComponent];

@NgModule({
  declarations: [...controls, ...groups, ...wrappers],
  exports: [VfWorkspaceModule],
  imports: [
    VfWorkspaceModule,
    NzInputModule,
    NzSwitchModule,
    NzFormModule,
    FormsModule,
    CommonModule,
    PortalModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzFormModule
  ]
})
export class VisualFormAntdModule {

  constructor(pluginService: PluginService) {
    pluginService.usePlatform(this.platform);
  }

  get platform(): VfPlatform {

    const panels: VfPanel<any>[] = [
      {
        id: 'id',
        title: '唯一标识',
        order: 0,
        panelType: InputComponent
      },
      {
        id: 'title',
        title: '标题',
        order: 0,
        panelType: InputComponent
      },
      {
        id: 'span',
        title: '宽度',
        order: 0,
        panelType: InputComponent,
        props: { type: 'number' }
      },
      {
        id: 'description',
        title: '描述',
        order: 0,
        panelType: InputComponent
      }
    ];
    const controlMap = new Map<VfIndicator, Type<FormControlTemplate>>([
      [indicators.input, InputComponent]
    ]);
    return {
      id: 'antd',
      panels,
      controlMap,
      propertyPanelGroup: DivGroupComponent,
      rootGroup: GridGroupComponent,
      defaultControlWrapper: FormItemWrapperComponent
    };
  }
}
