import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InputComponent } from './contorl-components/input.component';
import { DivGroupComponent } from './groups/div-group.component';
import { FormItemWrapperComponent } from './wrappers/form-item-wrapper.component';
import { GridGroupComponent } from './groups/grid-group.component';
import { InputNumberComponent } from './contorl-components/input-number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { controlDescriptors } from './control-descriptors';
import { TextareaComponent } from './contorl-components/textarea.component';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { ScriptSettingComponent } from './contorl-components/script-setting.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectComponent } from './contorl-components/select.component';
import { OptionSettingComponent } from './contorl-components/option-setting.component';
import { OptionSettingControl } from './controls/option-setting.control';
import { FormGroupComponent, FormGroupProps } from './groups/form-group.component';
import { VfRendererModule, VfWorkspaceModule } from '../core';
import { PATCH_CONTRIBUTORS, VfPlatform } from '../core/plugable/plugable';
import { PluginService } from '../core/plugable/plugin.service';
import { SpanPatchContributor } from './patches/patch-contributors';
import { DateComponent } from './contorl-components/date.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RadioComponent } from './contorl-components/radio.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CheckboxComponent } from './contorl-components/checkbox.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxControl } from './controls/checkbox.control';
import { AntdIndicatorComponent } from './indicator.component';

const controlComponents = [
  InputComponent,
  InputNumberComponent,
  SelectComponent,
  TextareaComponent,
  ScriptSettingComponent,
  OptionSettingComponent,
  DateComponent,
  RadioComponent,
  CheckboxComponent,
];
const controls = [OptionSettingControl, CheckboxControl];
const groups = [DivGroupComponent, GridGroupComponent, FormGroupComponent];
const wrappers = [FormItemWrapperComponent];

@NgModule({
  declarations: [AntdIndicatorComponent, ...controls, ...controlComponents, ...groups, ...wrappers],
  exports: [VfWorkspaceModule, VfRendererModule],
  imports: [
    VfWorkspaceModule,
    VfRendererModule,
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
    NzDatePickerModule,
    NzRadioModule,
    NzCheckboxModule,
    NzIconModule,
    DragDropModule,
  ],
  providers: [{ provide: PATCH_CONTRIBUTORS, useClass: SpanPatchContributor, multi: true }],
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
        props: { layout: 'vertical' } as FormGroupProps,
      },
      rootGroup: {
        component: GridGroupComponent,
        props: {},
      },
      indicatorComponent: AntdIndicatorComponent,
      defaultWrapperComponent: FormItemWrapperComponent,
    };
  }
}
