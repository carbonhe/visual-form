import { Component, forwardRef } from '@angular/core';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'option-setting',
  template: `
    <nz-input-group nz-row *ngFor="let option of options" nzSize="small">
      <nz-row nzGutter="8">
        <nz-col nzSpan="10">
          <input type="text" [(ngModel)]="option.label" nz-input />
        </nz-col>
        <nz-col nzSpan="10">
          <input type="text" [(ngModel)]="option.value" nz-input />
        </nz-col>
      </nz-row>
    </nz-input-group>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionSettingControl),
      multi: true,
    },
  ],
})
export class OptionSettingControl implements ControlValueAccessor {
  options: NzSelectOptionInterface[] = [];

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(options: NzSelectOptionInterface[]): void {
    this.options = options;
  }
}
