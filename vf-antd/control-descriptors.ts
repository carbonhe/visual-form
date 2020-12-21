import { InputComponent } from './contorls/input.component';
import { InputNumberComponent, InputNumberProps } from './contorls/input-number.component';
import { VfControlDescriptor, VfIndicator, VfProperty } from 'visual-form/plugable/plugable';
import { DropdownComponent, DropdownProps } from 'visual-form-antd/contorls/dropdown.component';
import { VfFormControl } from 'visual-form/renderer/types';
import { Validators } from '@angular/forms';
import { TextareaComponent } from 'visual-form-antd/contorls/textarea.component';

const indicators: { [key: string]: VfIndicator } = {
  input: {
    id: 'input',
    title: '输入框',
    icon: null,
  },
  inputNumber: {
    id: 'inputNumber',
    title: '数字输入框',
    icon: null,
  },
  textarea: {
    id: 'textarea',
    title: '文本域',
    icon: null,
  },
};

const properties: { [key: string]: VfProperty } = {
  id: {
    propertyKey: 'id',
    title: '唯一标识',
    template: InputComponent,
  },
  title: {
    propertyKey: 'title',
    title: '标题',
    template: InputComponent,
  },
  span: {
    propertyKey: 'span',
    title: '宽度',
    template: InputNumberComponent,
    templateProps: { min: 1, max: 24 } as InputNumberProps,
  },
  required: {
    propertyKey: 'required',
    title: '是否必填',
    template: DropdownComponent,
    templateProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      defaultValue: false,
    } as DropdownProps,
    patch(value: boolean, control: VfFormControl<any>): void {
      if (value) {
        /**
         * https://github.com/angular/angular/pull/37263
         * TODO: Wait the above api to keep the existing validators
         */
        control.setValidators(Validators.required);
      }
    },
  },
  description: {
    propertyKey: 'description',
    title: '描述',
    template: InputComponent,
  },
  min: {
    propertyKey: 'min',
    title: '最小值',
    template: InputNumberComponent,
  },
  max: {
    propertyKey: 'max',
    title: '最大值',
    template: InputNumberComponent,
  },
  rows: {
    propertyKey: 'rows',
    title: '行数',
    template: InputNumberComponent,
    templateProps: { min: 1 } as InputNumberProps,
  },
};

export const controlDescriptors: VfControlDescriptor[] = [
  {
    indicator: indicators.input,
    template: InputComponent,
    properties: [properties.id, properties.title, properties.span, properties.required, properties.description],
  },
  {
    indicator: indicators.inputNumber,
    template: InputNumberComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.min,
      properties.max,
    ],
  },
  {
    indicator: indicators.textarea,
    template: TextareaComponent,
    properties: [properties.id, properties.title, properties.span, properties.required, properties.description, properties.rows],
  },
];
