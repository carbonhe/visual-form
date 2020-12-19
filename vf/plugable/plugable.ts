import { TemplateRef, Type } from '@angular/core';
import { FormControlTemplate, FormControlWrapperTemplate, FormGroupTemplate } from '../renderer/types';
import { MetadataTransformer, Pairs } from 'visual-form/workspace/types';

export interface VfPlugin {
  id: string;
  panels: VfPanel<any>[];
  controlMap: Map<VfIndicator, Type<FormControlTemplate>>;
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

export interface VfPanel<T extends FormControlTemplate> {

  id: string;

  title: string;

  order: number;

  props?: Pairs;

  apply?(indicatorId: string): boolean;

  panelType: Type<T>;

  transformer?: MetadataTransformer;

}





