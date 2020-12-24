import { InputComponent } from './contorl-components/input.component';
import { InputNumberComponent, InputNumberProps } from './contorl-components/input-number.component';
import { PatchContext, VfControlDescriptor, VfIndicator, VfProperty } from 'visual-form/plugable/plugable';
import { DropdownComponent, DropdownProps } from 'visual-form-antd/contorl-components/dropdown.component';
import { Validators } from '@angular/forms';
import { TextareaComponent } from 'visual-form-antd/contorl-components/textarea.component';
import { CodeEditorProps, ScriptSettingComponent } from './contorl-components/script-setting.component';
import { OptionSettingComponent } from 'visual-form-antd/contorl-components/option-setting.component';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { KEYS } from 'visual-form-antd/types';

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
  dropdown: {
    id: 'dropdown',
    title: '下拉框',
    icon: null,
  },
};

const properties: { [key: string]: VfProperty } = {
  id: {
    propertyKey: 'id',
    title: '唯一标识',
    component: InputComponent,
  },
  title: {
    propertyKey: 'title',
    title: '标题',
    component: InputComponent,
  },
  span: {
    propertyKey: 'span',
    title: '宽度',
    component: InputNumberComponent,
    componentProps: { min: 1, max: 24 } as InputNumberProps,
  },
  required: {
    propertyKey: 'required',
    title: '是否必填',
    component: DropdownComponent,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      defaultValue: false,
    } as DropdownProps,
    patch(value: boolean, context: PatchContext): void {
      if (value) {
        /**
         * https://github.com/angular/angular/pull/37263
         * TODO: Waiting for the above api to keep the existing validators
         */
        context.control.setValidators(Validators.required);
      }
    },
  },
  description: {
    propertyKey: 'description',
    title: '描述',
    component: InputComponent,
  },
  min: {
    propertyKey: 'min',
    title: '最小值',
    component: InputNumberComponent,
  },
  max: {
    propertyKey: 'max',
    title: '最大值',
    component: InputNumberComponent,
  },
  rows: {
    propertyKey: 'rows',
    title: '行数',
    component: InputNumberComponent,
    componentProps: { min: 1 } as InputNumberProps,
  },
  script: {
    propertyKey: 'script',
    title: 'Script',
    component: ScriptSettingComponent,
    componentProps: { options: { language: 'javascript' } } as CodeEditorProps,
    patch(value: string, context: PatchContext) {
      const code = `'use strict';${value}`;
      try {
        new Function('$context', code)(context);
      } catch (error) {
        console.error(`script execute failed, please check your code. Cause by: \n${error.stack}`);
      }
    },
  },
  dropdown: {
    propertyKey: 'options',
    title: '选项设置',
    component: OptionSettingComponent,
    [KEYS.defaultValue]: [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 },
      { label: '选项三', value: 3 },
    ] as NzSelectOptionInterface[],
  },
};

export const controlDescriptors: VfControlDescriptor[] = [
  {
    indicator: indicators.input,
    component: InputComponent,
    properties: [properties.id, properties.title, properties.span, properties.required, properties.description, properties.script],
  },
  {
    indicator: indicators.inputNumber,
    component: InputNumberComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.min,
      properties.max,
      properties.script,
    ],
  },
  {
    indicator: indicators.textarea,
    component: TextareaComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.rows,
      properties.script,
    ],
  },
  {
    indicator: indicators.dropdown,
    component: DropdownComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.dropdown,
      properties.script,
    ],
  },
];
