import { PatchContext, PatchContributor } from 'visual-form/plugable/plugable';
import { ControlSetting } from 'visual-form/workspace/types';
import { KEYS } from 'visual-form-antd/types';
import { isNotNil } from 'ng-zorro-antd/core/util';

export class SpanPatchContributor implements PatchContributor {
  patch(controlSetting: ControlSetting, context: PatchContext): void {
    context.control.props.labelSpan = 6;
    context.control.props.controlSpan = 18;
  }
}

export class DefaultValuePatchContributor implements PatchContributor {
  patch(controlSetting: ControlSetting, context: PatchContext): void {
    if (isNotNil(controlSetting[KEYS.defaultValue])) {
      context.control.patchValue(controlSetting[KEYS.defaultValue]);
    }
  }
}
