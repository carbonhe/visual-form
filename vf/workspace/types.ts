import { VfFormControl } from 'visual-form/renderer/types';

export type Pairs = { [key: string]: any };


export interface CommonControlSetting {
  id: string;
  indicatorId: string;
  required: boolean;
  span?: number;
  title?: string;
}

export type ControlSetting = CommonControlSetting & Pairs;

export interface MetadataTransformer<TMetadata = Pairs> {
  generate(controlValue: any): TMetadata;

  apply(metadata: TMetadata, control: VfFormControl<any>): void;
}


export const VF_METADATA = '__METADATA';
