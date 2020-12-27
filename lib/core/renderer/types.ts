import { Type } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

interface NgFormExtension<TProps> {
  readonly props: TProps;
  readonly component: Type<any>;
}

export class VfFormControl<TProps> extends FormControl implements NgFormExtension<TProps> {
  readonly component: Type<ControlComponent<TProps>>;
  readonly wrapper?: Type<WrapperComponent<TProps>>;
  readonly props: TProps;

  constructor(
    component: Type<ControlComponent<TProps>>,
    wrapper?: Type<WrapperComponent<TProps>>,
    props?: TProps,
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
    this.component = component;
    this.wrapper = wrapper;
    this.props = props;
  }
}

export class VfFormGroup<TProps> extends FormGroup implements NgFormExtension<TProps> {
  readonly component: Type<GroupComponent<TProps>>;
  readonly props: TProps;

  constructor(
    component: Type<GroupComponent<TProps>>,
    controls: { [key: string]: AbstractControl },
    props?: TProps,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
    this.component = component;
    this.props = props;
  }
}

export interface ControlComponent<TProps = any> {
  control: VfFormControl<TProps>;
}

export interface WrapperComponent<TProps = any> {
  props: TProps;
}

export interface GroupComponent<TProps = any> {
  group: VfFormGroup<TProps>;
}

export type VfComponentType<TProps = any> = ControlComponent<TProps> | GroupComponent<TProps> | WrapperComponent<TProps>;

export function isInstanceOfControlComponent(instance: VfComponentType): instance is ControlComponent {
  return instance.hasOwnProperty('control') && instance['control'] instanceof VfFormControl;
}

export function isInstanceOfGroupComponent(instance: VfComponentType): instance is GroupComponent {
  return instance.hasOwnProperty('group') && instance['group'] instanceof VfFormGroup;
}

export function isInstanceOfWrapperComponent(instance: VfComponentType): instance is WrapperComponent {
  return instance.hasOwnProperty('props');
}
