export type Pairs = { [key: string]: any };

export interface ControlSetting extends Pairs {
  id: string;
  indicatorId: string;
  required: boolean;
  span?: number;
  title?: string;
}

export const VF_PATCHES = '__PATCHES';
