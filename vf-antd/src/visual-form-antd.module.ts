import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { VfWorkspaceModule } from 'visual-form';
import { PluginService } from 'visual-form/workspace/plugable/plugin.service';
import { VfIndicator, VfPanel, VfPlatform } from 'visual-form/workspace/plugable/plugable';
import { InputComponent } from './contorls/input.component';
import { FormControlTemplate } from 'visual-form/renderer/types';
import { indicators } from './indicators';

@NgModule({
  declarations: [InputComponent],
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
        id: 'identifier',
        order: 0,
        panelType: InputComponent,
        apply(indicatorId: string): boolean {
          return true;
        }
      }
    ];
    const controlMap = new Map<VfIndicator, Type<FormControlTemplate>>([
      [indicators.input, InputComponent]
    ]);
    return {
      id: 'antd',
      panels,
      controlMap
    };
  }
}
