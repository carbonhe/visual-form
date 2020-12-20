import { Type } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn
} from '@angular/forms';

interface NgFormExtension<TProps> {
  readonly props: TProps;
  readonly component: Type<any>;

}

export class VfFormControl<TProps> extends FormControl implements NgFormExtension<TProps> {
  readonly component: Type<FormControlTemplate<TProps>>;
  readonly wrapper?: Type<FormControlWrapperTemplate<TProps>>;
  readonly props: TProps;

  constructor(component: Type<FormControlTemplate<TProps>>, wrapper?: Type<FormControlWrapperTemplate<TProps>>, props?: TProps, formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);
    this.component = component;
    this.wrapper = wrapper;
    this.props = props;
  }
}

export class VfFormGroup<TProps> extends FormGroup implements NgFormExtension<TProps> {
  readonly component: Type<FormGroupTemplate<TProps>>;
  readonly props: TProps;

  constructor(component: Type<FormGroupTemplate<TProps>>, controls: { [key: string]: AbstractControl; }, props?: TProps, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, validatorOrOpts, asyncValidator);
    this.component = component;
    this.props = props;
  }
}

export interface FormControlTemplate<TProps = any> {
  control: VfFormControl<TProps>;
}

export interface FormControlWrapperTemplate<TProps = any> {
  props: TProps;
}

export interface FormGroupTemplate<TProps = any> {
  group: VfFormGroup<TProps>;
}



