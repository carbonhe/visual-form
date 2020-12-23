import { ComponentRef, Directive, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { VfFormGroup, VfTemplateType } from './types';
import { VfRenderer } from './renderer';

@Directive({
  selector: '[vf]',
  providers: [VfRenderer],
})
export class VfRendererDirective implements OnInit {
  @Input() vf: VfFormGroup<any>;

  @Output() onComponentRendered = new EventEmitter<ComponentRef<VfTemplateType>>();

  constructor(private viewContainer: ViewContainerRef, private renderer: VfRenderer) {}

  ngOnInit(): void {
    this.viewContainer.clear();
    this.renderer.componentRendered$.subscribe(componentRef => this.onComponentRendered.emit(componentRef));
    this.renderer.render(this.viewContainer, this.vf);
  }
}
