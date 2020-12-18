import { NgModule } from '@angular/core';
import { VfRendererDirective } from 'visual-form/renderer/vf-renderer.directive';

@NgModule({
  declarations: [VfRendererDirective],
  exports: [VfRendererDirective],
})
export class VfRendererModule {}
