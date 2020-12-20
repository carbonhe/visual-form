import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { VfFormGroup } from './types';
import { VfRenderer } from './renderer';

@Directive({
  selector: '[vf]'
})
export class VfRendererDirective implements OnInit {
  @Input() vf: VfFormGroup<any>;

  constructor(private viewContainer: ViewContainerRef, private renderer: VfRenderer) {
  }

  ngOnInit(): void {
    this.viewContainer.clear();
    this.renderer.render(this.viewContainer, this.vf);
  }
}
