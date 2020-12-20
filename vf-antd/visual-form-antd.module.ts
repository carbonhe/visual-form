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
import { VfControlDescriptor, VfPlatform } from 'visual-form/plugable/plugable';
import { InputComponent } from './contorls/input.component';
import { DivGroupComponent } from 'visual-form-antd/groups/div-group.component';
import { FormItemWrapperComponent } from 'visual-form-antd/wrappers/form-item-wrapper.component';
import { GridGroupComponent } from 'visual-form-antd/groups/grid-group.component';
import { InputNumberComponent } from 'visual-form-antd/contorls/input-number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const controls = [InputComponent, InputNumberComponent];
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
    NzInputNumberModule
  ]
})
export class VisualFormAntdModule {

  constructor(pluginService: PluginService) {
    pluginService.usePlatform(this.platform);
  }

  get platform(): VfPlatform {


    const controlDescriptors: VfControlDescriptor[] = [
      {
        indicator: indicators.input,
        template: InputComponent,
        properties: [properties.id, properties.title, properties.span, properties.description]
      },
      {
        indicator: indicators.inputNumber,
        template: InputNumberComponent,
        properties: [properties.id, properties.title, properties.span, properties.description, properties.min, properties.max]
      }
    ];
    return {
      id: 'antd',
      controlDescriptors,
      propertyPanelGroup: DivGroupComponent,
      rootGroup: GridGroupComponent,
      defaultControlWrapper: FormItemWrapperComponent
    };
  }
}

export const indicators = {
  input: {
    id: 'input',
    title: '输入框',
    icon: null
  },
  inputNumber: {
    id: 'inputNumber',
    title: '数字输入框',
    icon: null
  }
};

export const properties = {
  id: {
    id: 'id',
    title: '唯一标识',
    template: InputComponent
  },
  title: {
    id: 'title',
    title: '标题',
    template: InputComponent
  },
  span: {
    id: 'span',
    title: '宽度',
    template: InputNumberComponent,
    templateProps: { min: 1, max: 24 }
  },
  description: {
    id: 'description',
    title: '描述',
    template: InputComponent
  },
  min: {
    id: 'min',
    title: '最小值',
    template: InputNumberComponent
  },
  max: {
    id: 'max',
    title: '最大值',
    template: InputNumberComponent
  }
};
