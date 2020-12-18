import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { VfFormControl, VfFormGroup } from './types';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class VfRenderer {
  constructor(private componentResolver: ComponentFactoryResolver) {}

  render(viewContainer: ViewContainerRef, control: AbstractControl): ComponentRef<any> {
    this.check(control);
    if (control instanceof VfFormControl) {
      const factory = this.componentResolver.resolveComponentFactory(control.component);
      const componentRef = viewContainer.createComponent(factory);
      componentRef.instance.control = control;
      return componentRef;
    } else if (control instanceof VfFormGroup) {
      const controls = control.controls;
      const children: ComponentRef<unknown>[] = [];

      for (const controlName in controls) {
        if (controls.hasOwnProperty(controlName)) {
          children.push(this.render(viewContainer, controls[controlName] as VfFormControl | VfFormGroup));
        }
      }
      const componentRef = viewContainer.createComponent(this.componentResolver.resolveComponentFactory(control.component), null, null, [
        children.map(e => e.location.nativeElement),
      ]);
      componentRef.instance.group = control;
      return componentRef;
    }
  }

  private check(control: AbstractControl) {
    if (control instanceof VfFormControl || control instanceof VfFormGroup) {
      if (!control.component) {
        throw new Error(`component must be associated!`);
      }
    } else {
      throw new Error('parameter `control` must be an instance of VfFormControl or VfFormGroup!');
    }
  }
}
