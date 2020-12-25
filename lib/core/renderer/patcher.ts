import { Inject, Injectable, Optional } from '@angular/core';
import {
  PATCH_CONTEXT_CONTRIBUTORS,
  PATCH_CONTRIBUTORS,
  PatchContext,
  PatchContextContributor,
  PatchContributor,
} from '../plugable/plugable';
import { ControlSetting } from '../workspace/types';

@Injectable({ providedIn: 'root' })
export class Patcher {
  constructor(
    @Inject(PATCH_CONTEXT_CONTRIBUTORS) @Optional() private patchContextContributors: PatchContextContributor[],
    @Inject(PATCH_CONTRIBUTORS) @Optional() private patchContributors: PatchContributor[]
  ) {}

  get extraPatchContext() {
    let contributedContext = {};
    if (this.patchContextContributors) {
      this.patchContextContributors.forEach(contributor => {
        contributedContext = { ...contributedContext, ...contributor.contribute() };
      });
    }
    return contributedContext;
  }

  applyExtraPatches(controlSetting: ControlSetting, context: PatchContext) {
    if (this.patchContributors) {
      Object.keys(this.extraPatchContext).forEach(k => {
        context.extra[k] = this.extraPatchContext[k];
      });
      this.patchContributors.forEach(contributor => contributor.patch(controlSetting, context));
    }
  }
}
