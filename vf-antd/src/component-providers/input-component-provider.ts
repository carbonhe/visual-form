import { ComponentProvider, AbstractFormControlComponent } from 'visual-form';
import { Component, Injectable, Type } from '@angular/core';

@Injectable()
export class InputComponentProvider implements ComponentProvider<any, any, any> {
  getComponentType(): Type<InputComponent> {
    return InputComponent;
  }

  getId() {
    return 'input';
  }

  getName(): string {
    return '输入框';
  }
}

@Component({
  template: `<input nz-input />`,
})
export class InputComponent extends AbstractFormControlComponent {}
