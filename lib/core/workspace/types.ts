export type Pairs = { [key: string]: any };

export interface CommonControlSetting {
  id: string;
  indicatorId: string;
  required: boolean;
  span?: number;
  title?: string;
}

export type ControlSetting = CommonControlSetting & Pairs;

export const VF_PATCHES = '__PATCHES';
