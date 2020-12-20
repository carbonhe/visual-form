import { InputComponent } from './contorls/input.component';
import { InputNumberComponent } from './contorls/input-number.component';
import { VfControlDescriptor } from 'visual-form/plugable/plugable';

const indicators = {
  input: {
    id: 'input',
    title: '输入框',
    icon: null
  },
  inputNumber: {
    id: 'inputNumber',
    title: '数字输入框',
    icon: null
  }
};

const properties = {
  id: {
    id: 'id',
    title: '唯一标识',
    template: InputComponent
  },
  title: {
    id: 'title',
    title: '标题',
    template: InputComponent
  },
  span: {
    id: 'span',
    title: '宽度',
    template: InputNumberComponent,
    templateProps: { min: 1, max: 24 }
  },
  description: {
    id: 'description',
    title: '描述',
    template: InputComponent
  },
  min: {
    id: 'min',
    title: '最小值',
    template: InputNumberComponent
  },
  max: {
    id: 'max',
    title: '最大值',
    template: InputNumberComponent
  }
};

export const controlDescriptors: VfControlDescriptor[] = [
  {
    indicator: indicators.input,
    template: InputComponent,
    properties: [properties.id, properties.title, properties.span, properties.description]
  },
  {
    indicator: indicators.inputNumber,
    template: InputNumberComponent,
    properties: [properties.id, properties.title, properties.span, properties.description, properties.min, properties.max]
  }
];
