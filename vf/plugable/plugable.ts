import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { ControlComponent, GroupComponent, VfFormControl, WrapperComponent } from '../renderer/types';
import { ControlSetting, Pairs } from 'visual-form/workspace/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface VfPlugin {
  id: string;
  controlDescriptors: VfControlDescriptor[];
}

export interface VfPlatform extends VfPlugin {
  propertyGroup: ComponentWithProps<GroupComponent, any>;
  rootGroup: ComponentWithProps<GroupComponent, any>;
  defaultWrapperComponent?: Type<WrapperComponent>;
}

export interface ComponentWithProps<TComponent extends ControlComponent<TProps> | GroupComponent<TProps>, TProps> {
  component: Type<TComponent>;
  props: TProps;
}

export interface VfIndicator {
  id: string;
  title: string;
  icon: TemplateRef<any> | Type<any>;
}

export interface VfProperty<T extends ControlComponent = any> {
  propertyKey: string;

  title: string;

  component: Type<T>;

  componentProps?: Pairs;

  patch?(value: any, context: PatchContext): void;
}

export interface VfControlDescriptor {
  indicator: VfIndicator;
  component: Type<ControlComponent>;
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

export interface PatchContributor {
  patch(controlSetting: ControlSetting, context: PatchContext): void;
}

export const PATCH_CONTEXT_CONTRIBUTORS = new InjectionToken<PatchContextContributor[]>('PATCH_CONTEXT_CONTRIBUTORS');

export const PATCH_CONTRIBUTORS = new InjectionToken<PatchContributor[]>('PATCH_CONTRIBUTORS');
