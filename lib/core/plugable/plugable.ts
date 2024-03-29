import { InjectionToken, Type } from '@angular/core';
import { ControlComponent, GroupComponent, VfFormControl, WrapperComponent } from '../renderer/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ControlSetting, Pairs } from '../workspace/types';

export interface VfPlugin {
  id: string;
  controlDescriptors: VfControlDescriptor[];
}

export interface VfPlatform extends VfPlugin {
  propertyGroup: ComponentWithProps<GroupComponent, any>;
  rootGroup: ComponentWithProps<GroupComponent, any>;
  indicatorComponent: Type<IndicatorComponent>;
  defaultWrapperComponent?: Type<WrapperComponent>;
}

export interface ComponentWithProps<TComponent extends ControlComponent<TProps> | GroupComponent<TProps>, TProps> {
  component: Type<TComponent>;
  props: TProps;
}

export interface VfIndicator {
  id: string;
  title: string;
  icon?: string;
}

export interface VfProperty<T extends ControlComponent = any> extends Pairs {
  propertyKey: string;

  title: string;

  component: Type<T>;

  componentProps?: Pairs;

  defaultValue?: any;

  patch?(value: any, context: PatchContext): void;
}

export interface IndicatorComponent {
  indicator: VfIndicator;
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
