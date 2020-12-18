import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { VfRenderService } from './vf-render.service';
import { VfFormGroup } from './types';

@Directive({
  selector: '[vf]',
})
export class VfRenderDirective implements OnInit {
  @Input() vf: VfFormGroup;

  constructor(private viewContainer: ViewContainerRef, private renderer: VfRenderService) {}

  ngOnInit(): void {
    this.viewContainer.clear();
    this.renderer.render(this.viewContainer, this.vf);
  }
}
