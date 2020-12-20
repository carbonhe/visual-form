import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { VfWorkspaceModule } from 'visual-form';
import { PluginService } from 'visual-form/plugable/plugin.service';
import { VfPlatform } from 'visual-form/plugable/plugable';
import { InputComponent } from './contorls/input.component';
import { DivGroupComponent } from 'visual-form-antd/groups/div-group.component';
import { FormItemWrapperComponent } from 'visual-form-antd/wrappers/form-item-wrapper.component';
import { GridGroupComponent } from 'visual-form-antd/groups/grid-group.component';
import { InputNumberComponent } from 'visual-form-antd/contorls/input-number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { DropdownComponent } from 'visual-form-antd/contorls/dropdown.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { controlDescriptors } from './control-descriptors';

const controls = [InputComponent, InputNumberComponent, DropdownComponent];
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
    NzFormModule,
    NzInputNumberModule,
    NzSelectModule
  ]
})
export class VisualFormAntdModule {

  constructor(pluginService: PluginService) {
    pluginService.usePlatform(this.platform);
  }

  get platform(): VfPlatform {

    return {
      id: 'antd',
      controlDescriptors,
      propertyPanelGroup: DivGroupComponent,
      rootGroup: GridGroupComponent,
      defaultControlWrapper: FormItemWrapperComponent
    };
  }
}


