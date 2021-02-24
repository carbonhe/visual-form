import { Component, OnInit } from '@angular/core';
import { WorkspaceContext } from '../workspace-context';
import { Options } from 'sortablejs';
import { PluginService } from '../../plugable/plugin.service';
import { VfIndicator } from '../../plugable/plugable';
import { ControlSetting } from '../types';

@Component({
  selector: 'vf-component-panel',
  template: `
    <div
      class="indicators-container"
      [sortablejs]="indicators"
      [sortablejsOptions]="sortableOptions"
      [sortablejsCloneFunction]="cloneFunction"
    >
      <div class="indicator-wrapper" [ngStyle]="{ width: width }" *ngFor="let indicator of indicators">
        <vf-indicator [indicator]="indicator"></vf-indicator>
      </div>
    </div>
  `,
})
export class ComponentPanelComponent implements OnInit {
  sortableOptions: Options;
  width: string;

  private column = 2;

  get indicators(): VfIndicator[] {
    return this.pluginService.indicators;
  }

  constructor(private dcs: WorkspaceContext, private pluginService: PluginService) {
    this.sortableOptions = { ...dcs.sharedOptions, ...{ animation: 150, sort: false, onEnd: this.dcs.drop } };
    Object.assign(this.sortableOptions.group, { pull: 'clone', put: false });
  }

  ngOnInit(): void {
    const col = this.column < 1 ? 1 : this.column;
    this.width = Math.floor(100 / col) + '%';
  }

  cloneFunction(indicator: VfIndicator): ControlSetting {
    const id = `${indicator.id}_${Math.random().toString(36).substr(2, 6)}`;
    return { id, span: 24, title: indicator.title, indicatorId: indicator.id, required: false };
  }
}
