import { NgModule } from '@angular/core';
import { COMMON_PROPERTY_COMPONENT, COMPONENT_PROVIDERS, FORM_RENDER_COMPONENT, VisualFormModule } from 'visual-form';
import { InputComponent, InputComponentProvider } from './component-providers/input-component-provider';
import { CommonPropertyComponent } from './component-providers/common-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRenderComponent } from './component-providers/form-render.component';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [CommonPropertyComponent, FormRenderComponent, InputComponent],
  exports: [VisualFormModule],
  imports: [
    VisualFormModule,
    NzInputModule,
    NzSwitchModule,
    NzFormModule,
    FormsModule,
    CommonModule,
    PortalModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzFormModule,
  ],
  providers: [
    {
      provide: FORM_RENDER_COMPONENT,
      useValue: FormRenderComponent,
    },
    {
      provide: COMMON_PROPERTY_COMPONENT,
      useValue: CommonPropertyComponent,
    },
    {
      provide: COMPONENT_PROVIDERS,
      useClass: InputComponentProvider,
      multi: true,
    },
  ],
})
export class VisualFormAntdModule {}
