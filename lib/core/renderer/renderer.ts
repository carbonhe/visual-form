import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { VfComponentType, VfFormControl, VfFormGroup } from './types';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceElement } from '@angular/cdk/coercion';

@Injectable()
export class VfRenderer {
  private _rendered$ = new Subject<ComponentRef<VfComponentType>>();

  rendered$ = this._rendered$.asObservable();

  constructor(private componentResolver: ComponentFactoryResolver) {}

  render(viewContainer: ViewContainerRef, control: AbstractControl): ComponentRef<VfComponentType> {
    if (!control) {
      return;
    }
    const rootComponentRef = this._render(viewContainer, control);
    this._rendered$.complete();
    return rootComponentRef;
  }

  private _render(viewContainer: ViewContainerRef, control: AbstractControl): ComponentRef<VfComponentType> {
    this.check(control);
    if (control instanceof VfFormControl) {
      const factory = this.componentResolver.resolveComponentFactory(control.component);
      const componentRef = viewContainer.createComponent(factory);
      componentRef.instance.control = control;
      this._rendered$.next(componentRef);
      if (control.wrapper) {
        const wrapperFactory = this.componentResolver.resolveComponentFactory(control.wrapper);
        const wrapperComponentRef = viewContainer.createComponent(wrapperFactory, null, null, [[coerceElement(componentRef.location)]]);
        wrapperComponentRef.instance.props = control.props;
        this._rendered$.next(wrapperComponentRef);
        return wrapperComponentRef;
      }
      return componentRef;
    } else if (control instanceof VfFormGroup) {
      const controls = control.controls;
      const children: ComponentRef<unknown>[] = [];

      for (const controlName in controls) {
        if (controls.hasOwnProperty(controlName)) {
          children.push(this._render(viewContainer, controls[controlName] as VfFormControl<any> | VfFormGroup<any>));
        }
      }
      const componentRef = viewContainer.createComponent(this.componentResolver.resolveComponentFactory(control.component), null, null, [
        children.map(e => coerceElement(e.location)),
      ]);
      componentRef.instance.group = control;
      this._rendered$.next(componentRef);
      return componentRef;
    }
  }

  private check(control: AbstractControl) {
    if (control instanceof VfFormControl || control instanceof VfFormGroup) {
      if (!control.component) {
        throw new Error('Component must be associated!');
      }
    } else {
      throw new Error('Parameter `control` must be an instance of VfFormControl or VfFormGroup!');
    }
  }
}
