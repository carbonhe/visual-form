import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { VfFormControl, VfFormGroup, VfTemplateType } from './types';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export class VfRenderer {
  private _componentRendered$ = new Subject<ComponentRef<VfTemplateType>>();

  componentRendered$ = this._componentRendered$.asObservable();

  constructor(private componentResolver: ComponentFactoryResolver) {}

  render(viewContainer: ViewContainerRef, control: AbstractControl): ComponentRef<VfTemplateType> {
    let rootComponentRef = this._render(viewContainer, control);
    this._componentRendered$.next(rootComponentRef);
    this._componentRendered$.complete();
    return rootComponentRef;
  }

  private _render(viewContainer: ViewContainerRef, control: AbstractControl): ComponentRef<VfTemplateType> {
    this.check(control);
    if (control instanceof VfFormControl) {
      const factory = this.componentResolver.resolveComponentFactory(control.component);
      const componentRef = viewContainer.createComponent(factory);
      componentRef.instance.control = control;
      this._componentRendered$.next(componentRef);
      if (control.wrapper) {
        const wrapperFactory = this.componentResolver.resolveComponentFactory(control.wrapper);
        const wrapperComponentRef = viewContainer.createComponent(wrapperFactory, null, null, [[this.ignoreComponentTag(componentRef)]]);
        wrapperComponentRef.instance.props = control.props;
        this._componentRendered$.next(wrapperComponentRef);
        return wrapperComponentRef;
      }
      return componentRef;
    } else if (control instanceof VfFormGroup) {
      const controls = control.controls;
      const children: ComponentRef<unknown>[] = [];

      for (const controlName in controls) {
        if (controls.hasOwnProperty(controlName)) {
          children.push(this.render(viewContainer, controls[controlName] as VfFormControl<any> | VfFormGroup<any>));
        }
      }
      const componentRef = viewContainer.createComponent(this.componentResolver.resolveComponentFactory(control.component), null, null, [
        children.map(this.ignoreComponentTag),
      ]);
      componentRef.instance.group = control;
      this._componentRendered$.next(componentRef);
      return componentRef;
    }
  }

  /**
   * Since Angular always wrap template content with a component tag in DOM,
   * that may cause the css to not take effect.
   * So we should unwrap template content to avoid the unexpected effect.
   *
   * @param componentRef which component's tag need to be ignored
   * @private
   */
  private ignoreComponentTag(componentRef: ComponentRef<any>) {
    return componentRef.location.nativeElement.firstElementChild;
  }

  private check(control: AbstractControl) {
    if (control instanceof VfFormControl || control instanceof VfFormGroup) {
      if (!control.component) {
        throw new Error(RenderErrors.MISSING_COMPONENT);
      }
    } else {
      throw new Error(RenderErrors.TYPE_MISMATCH);
    }
  }
}

export const RenderErrors = {
  MISSING_COMPONENT: 'Component must be associated!',
  TYPE_MISMATCH: 'parameter `control` must be an instance of VfFormControl or VfFormGroup!',
};
