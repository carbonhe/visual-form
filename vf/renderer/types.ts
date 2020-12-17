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

export class VfFormControl<TProps = any> extends FormControl implements NgFormExtension<TProps> {
  readonly component: Type<FormControlTemplate<TProps>>;
  readonly props: TProps;

  constructor(component: Type<FormControlTemplate<TProps>>, formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);
    this.component = component;
  }
}

export class VfFormGroup<TProps = any> extends FormGroup implements NgFormExtension<TProps> {
  readonly component: Type<FormGroupTemplate<TProps>>;
  readonly props: TProps;

  constructor(component: Type<FormGroupTemplate<TProps>>, controls: { [key: string]: AbstractControl; }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, validatorOrOpts, asyncValidator);
    this.component = component;
  }
}

export interface FormControlTemplate<TProps = any> {
  control: VfFormControl<TProps>;
}

export interface FormGroupTemplate<TProps = any> {
  group: VfFormGroup<TProps>;
}



