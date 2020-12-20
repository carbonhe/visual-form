import { TemplateRef, Type } from '@angular/core';
import { FormControlTemplate, FormControlWrapperTemplate, FormGroupTemplate } from '../renderer/types';
import { MetadataTransformer, Pairs } from 'visual-form/workspace/types';

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

  id: string;

  title: string;

  template: Type<T>;

  templateProps?: Pairs;

  transformer?: MetadataTransformer;

}

export interface VfControlDescriptor {
  indicator: VfIndicator;
  template: Type<FormControlTemplate>;
  properties: VfProperty[];
}





