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
import { PATCH_CONTRIBUTORS, VfPlatform } from 'visual-form/plugable/plugable';
import { InputComponent } from './contorls/input.component';
import { DivGroupComponent } from './groups/div-group.component';
import { FormItemWrapperComponent } from './wrappers/form-item-wrapper.component';
import { GridGroupComponent } from './groups/grid-group.component';
import { InputNumberComponent } from './contorls/input-number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { DropdownComponent } from 'visual-form-antd/contorls/dropdown.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { controlDescriptors } from './control-descriptors';
import { TextareaComponent } from './contorls/textarea.component';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { ScriptSettingComponent } from './contorls/script-setting.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormGroupComponent, FormGroupProps } from 'visual-form-antd/groups/form-group.component';
import { SpanPatchContributor } from 'visual-form-antd/patches/patch-contributors';
import { OptionSettingComponent } from 'visual-form-antd/contorls/option-setting.component';

const controls = [InputComponent, InputNumberComponent, DropdownComponent, TextareaComponent, ScriptSettingComponent, OptionSettingComponent];
const groups = [DivGroupComponent, GridGroupComponent, FormGroupComponent];
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
    NzSelectModule,
    NzCodeEditorModule,
    NzButtonModule,
    NzIconModule
  ],
  providers: [{ provide: PATCH_CONTRIBUTORS, useClass: SpanPatchContributor, multi: true }]
})
export class VisualFormAntdModule {
  constructor(pluginService: PluginService) {
    pluginService.usePlatform(this.platform);
  }

  get platform(): VfPlatform {
    return {
      id: 'antd',
      controlDescriptors,
      propertyGroup: {
        component: FormGroupComponent,
        props: { layout: 'vertical' } as FormGroupProps
      },
      rootGroup: {
        component: GridGroupComponent,
        props: {}
      },
      defaultWrapperComponent: FormItemWrapperComponent
    };
  }
}
