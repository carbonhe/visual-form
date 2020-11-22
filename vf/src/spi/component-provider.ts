import { InjectionToken, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export const COMPONENT_PROVIDERS = new InjectionToken<ComponentProvider<any, any, any>[]>('COMPONENT_PROVIDERS');

export const COMMON_PROPERTY_COMPONENT = new InjectionToken<CommonPropertyComponent>('COMMON_PROPERTY_COMPONENT');

export const FORM_RENDER_COMPONENT = new InjectionToken<Type<FormRender>>('FORM_RENDER_COMPONENT');

export interface ComponentProvider<
  TPropertyComponent extends AbstractFormGroupComponent,
  TComponent extends AbstractFormControlComponent,
  TPropertyModel extends PropertyModel
> {
  getId(): string;

  getName(): string;

  getPropertyComponentType?(): Type<TPropertyComponent>;

  getComponentType(): Type<TComponent>;
}

export interface PropertyModel {
  componentId: string;
  id: string;
  span: number;
  title: string;
  description?: string;
}

export type CommonPropertyComponent = Type<PropertyModel>;

export interface FormRender {
  controls: PropertyModel[];
}

export abstract class AbstractFormControlComponent<TModel = any> {
  model: TModel;

  extractFormControl(property: PropertyModel): FormControl {
    const formControl = new FormControl();
    return formControl;
  }
}

export abstract class AbstractFormGroupComponent<TModel = any> {
  abstract formGroup: FormGroup;
  model: TModel;
}
