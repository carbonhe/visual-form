import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'checkbox',
  template: `
    <nz-checkbox-wrapper (nzOnChange)="emitChange($event)">
      <label nz-checkbox [nzValue]="option.value" [ngModel]="isChecked(option.value)" *ngFor="let option of checkboxOptions">{{
        option.label
      }}</label>
    </nz-checkbox-wrapper>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControl),
      multi: true,
    },
  ],
})
export class CheckboxControl implements ControlValueAccessor {
  @Input() checkboxOptions: Pick<NzSelectOptionInterface, 'label' | 'value'>[] = [];

  private checked: any[] = [];

  private onChange: OnChangeType;

  private onTouch: OnTouchedType;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(values: any[]): void {
    this.checked = values ?? [];
  }

  isChecked(value: any): boolean {
    return this.checked.includes(value);
  }

  emitChange(checked: any[]) {
    this.checked = checked;
    this.onChange(this.checked);
  }
}
