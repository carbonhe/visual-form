import { Component } from '@angular/core';
import { AbstractFormGroupComponent, PropertyModel } from 'visual-form';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: `
    <ng-container [formGroup]="formGroup">
      <nz-form-item>
        <nz-form-label [nzSpan]="6">唯一标识</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input formControlName="id" nz-input name="id" type="text" [(ngModel)]="model.id" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">标题</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input formControlName="title" nz-input name="title" type="text" [(ngModel)]="model.title" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">宽度</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input nz-input formControlName="span" name="span" type="number" [(ngModel)]="model.span" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">描述</nz-form-label>
        <nz-form-control [nzSpan]="18">
          <input nz-input formControlName="description" name="description" type="text" [(ngModel)]="model.description" />
        </nz-form-control>
      </nz-form-item>
    </ng-container>
  `,
})
export class CommonPropertyComponent extends AbstractFormGroupComponent<PropertyModel> {
  formGroup: FormGroup;

  constructor(fb: FormBuilder) {
    super();
    this.formGroup = fb.group({
      id: [],
      title: [],
      span: [],
      description: [],
    });
  }
}
