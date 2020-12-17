import { TemplateRef, Type } from '@angular/core';
import { FormControlTemplate } from '../../renderer/types';

export interface VfPlugin {
  id: string;
  panels: VfPanel<any>[];
  controlMap: Map<VfIndicator, Type<FormControlTemplate>>;
}

export interface VfPlatform extends VfPlugin {
  rendererType?: Type<any>;
}


export interface VfIndicator {
  id: string;
  title: string;
  icon: TemplateRef<any> | Type<any>;
}

export interface VfPanel<T extends FormControlTemplate> {

  id: string;

  order: number;

  apply(indicatorId: string): boolean;

  panelType: Type<T>;
}





