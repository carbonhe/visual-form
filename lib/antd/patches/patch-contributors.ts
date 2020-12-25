import { PatchContext, PatchContributor } from '../../core/plugable/plugable';
import { ControlSetting } from '../../core/workspace/types';

export class SpanPatchContributor implements PatchContributor {
  patch(controlSetting: ControlSetting, context: PatchContext): void {
    context.control.props.labelSpan = 6;
    context.control.props.controlSpan = 18;
  }
}
