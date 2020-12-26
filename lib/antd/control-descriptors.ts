import { InputComponent } from './contorl-components/input.component';
import { InputNumberComponent, InputNumberProps } from './contorl-components/input-number.component';
import { PatchContext, VfControlDescriptor, VfIndicator, VfProperty } from '../core/plugable/plugable';
import { SelectComponent, SelectProps } from './contorl-components/select.component';
import { Validators } from '@angular/forms';
import { TextareaComponent } from './contorl-components/textarea.component';
import { CodeEditorProps, ScriptSettingComponent } from './contorl-components/script-setting.component';
import { OptionSettingComponent } from './contorl-components/option-setting.component';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { DateComponent } from './contorl-components/date.component';
import { RadioComponent } from './contorl-components/radio.component';

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
  select: {
    id: 'select',
    title: '下拉框',
    icon: null,
  },
  date: {
    id: 'date',
    title: '日期选择',
    icon: null,
  },
  radio: {
    id: 'radio',
    title: '单选框',
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
    componentProps: { min: 8, max: 24 } as InputNumberProps,
  },
  required: {
    propertyKey: 'required',
    title: '是否必填',
    component: SelectComponent,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      selectMode: 'default',
    } as SelectProps,
    defaultValue: false,
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
  options: {
    propertyKey: 'options',
    title: '选项设置',
    component: OptionSettingComponent,
    defaultValue: [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 },
      { label: '选项三', value: 3 },
    ] as NzSelectOptionInterface[],
  },
  selectMode: {
    propertyKey: 'selectMode',
    title: '选择模式',
    component: SelectComponent,
    componentProps: {
      options: [
        { label: '单选', value: 'default' },
        { label: '多选', value: 'multiple' },
        { label: '标签', value: 'tags' },
      ],
      selectMode: 'default',
    } as SelectProps,
    defaultValue: 'default',
  },
  range: {
    propertyKey: 'range',
    title: '是否区间',
    component: SelectComponent,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      selectMode: 'default',
    } as SelectProps,
    defaultValue: false,
  },
  dateMode: {
    propertyKey: 'dateMode',
    title: '日期模式',
    component: SelectComponent,
    componentProps: {
      options: [
        { label: '时分', value: 'time' },
        { label: '日期', value: 'date' },
        { label: '周', value: 'week' },
        { label: '月份', value: 'month' },
        { label: '年份', value: 'year' },
        { label: '十年', value: 'decade' },
      ],
      selectMode: 'default',
    } as SelectProps,
    defaultValue: 'date',
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
    indicator: indicators.select,
    component: SelectComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.selectMode,
      properties.options,
      properties.script,
    ],
  },
  {
    indicator: indicators.date,
    component: DateComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.range,
      properties.dateMode,
      properties.script,
    ],
  },
  {
    indicator: indicators.radio,
    component: RadioComponent,
    properties: [
      properties.id,
      properties.title,
      properties.span,
      properties.required,
      properties.description,
      properties.options,
      properties.script,
    ],
  },
];
