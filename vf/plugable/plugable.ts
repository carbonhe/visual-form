import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { ControlComponent, GroupComponent, VfFormControl, WrapperComponent } from '../renderer/types';
import { Pairs } from 'visual-form/workspace/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface VfPlugin {
  id: string;
  controlDescriptors: VfControlDescriptor[];
}

export interface VfPlatform extends VfPlugin {
  propertyGroupComponent: Type<GroupComponent>;
  rootGroupComponent: Type<GroupComponent>;
  defaultWrapperComponent?: Type<WrapperComponent>;
}

export interface VfIndicator {
  id: string;
  title: string;
  icon: TemplateRef<any> | Type<any>;
}

export interface VfProperty<T extends ControlComponent = any> {
  propertyKey: string;

  title: string;

  template: Type<T>;

  templateProps?: Pairs;

  patch?(value: any, context: PatchContext): void;
}

export interface VfControlDescriptor {
  indicator: VfIndicator;
  template: Type<ControlComponent>;
  properties: VfProperty[];
}

export interface PatchContext {
  readonly control: VfFormControl<any>;
  readonly rendered$: Observable<void>;
  readonly httpClient: HttpClient;
  readonly extra: Pairs;
}

export interface PatchContextContributor {
  contribute(): Pairs;
}

export const PATCH_CONTEXT_CONTRIBUTORS = new InjectionToken<PatchContextContributor[]>('PATCH_CONTEXT_CONTRIBUTORS');
