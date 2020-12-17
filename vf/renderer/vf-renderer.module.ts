import { NgModule } from '@angular/core';
import { VfRenderDirective } from './vf-render.directive';

@NgModule({
  declarations: [VfRenderDirective],
  exports: [VfRenderDirective]
})
export class VfRendererModule {

}
