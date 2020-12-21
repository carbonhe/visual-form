import { TemplateRef, Type } from '@angular/core';
import { FormControlTemplate, FormControlWrapperTemplate, FormGroupTemplate, VfFormControl } from '../renderer/types';
import { Pairs } from 'visual-form/workspace/types';

export interface VfPlugin {
  id: string;
  controlDescriptors: VfControlDescriptor[];
}

export interface VfPlatform extends VfPlugin {
  propertyPanelGroup: Type<FormGroupTemplate>;
  rootGroup: Type<FormGroupTemplate>;
  defaultControlWrapper?: Type<FormControlWrapperTemplate>;
}

export interface VfIndicator {
  id: string;
  title: string;
  icon: TemplateRef<any> | Type<any>;
}

export interface VfProperty<T extends FormControlTemplate = any> {
  propertyKey: string;

  title: string;

  template: Type<T>;

  templateProps?: Pairs;

  patch?(value: any, control: VfFormControl<any>): void;
}

export interface VfControlDescriptor {
  indicator: VfIndicator;
  template: Type<FormControlTemplate>;
  properties: VfProperty[];
}
