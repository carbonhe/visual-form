import { PatchContext, PatchContributor } from 'visual-form/plugable/plugable';
import { ControlSetting } from 'visual-form/workspace/types';

export class SpanPatchContributor implements PatchContributor {
  patch(controlSetting: ControlSetting, context: PatchContext): void {
    context.control.props.labelSpan = 6;
    context.control.props.controlSpan = 18;
  }
}
