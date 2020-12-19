import { NgModule } from '@angular/core';
import { VfRendererDirective } from './renderer.directive';
import { VfContainerComponent } from 'visual-form/renderer/container.component';

@NgModule({
  declarations: [VfRendererDirective, VfContainerComponent],
  exports: [VfRendererDirective, VfContainerComponent]
})
export class VfRendererModule {
}
