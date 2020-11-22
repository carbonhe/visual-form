import { Component, Input, OnInit } from '@angular/core';
import { ComponentIndicatorConfiguration } from './component-indicator.component';
import { DragConnectionService } from '../services/drag-connection.service';
import { Options } from 'sortablejs';
import { PropertyModel } from '../spi/component-provider';

@Component({
  selector: 'vf-component-panel',
  template: `
    <div
      style="height: 100%"
      [sortablejs]="cfg.componentIndicators"
      [sortablejsOptions]="sortableOptions"
      [sortablejsCloneFunction]="cloneFunction"
    >
      <div style="opacity: 1;" class="indicator-wrapper" [ngStyle]="{ width: width }" *ngFor="let indicator of cfg.componentIndicators">
        <vf-component-indicator [cfg]="indicator"></vf-component-indicator>
      </div>
    </div>
  `,
})
export class ComponentPanelComponent implements OnInit {
  sortableOptions: Options;
  @Input()
  cfg: ComponentPanelConfiguration;
  width: string;

  constructor(private dcs: DragConnectionService) {
    this.sortableOptions = { ...dcs.sharedOptions, ...{ animation: 150, sort: false, onEnd: this.dcs.drop } };
    Object.assign(this.sortableOptions.group, { pull: 'clone', put: false });
  }

  ngOnInit(): void {
    const col = this.cfg.column < 1 ? 1 : this.cfg.column;
    this.width = Math.floor(100 / col) + '%';
  }

  cloneFunction(configuration: ComponentIndicatorConfiguration): PropertyModel {
    const id = `${configuration.id}_${Math.random().toString(36).substr(2, 6)}`;
    return { id, span: 24, title: configuration.name, componentId: configuration.id };
  }
}

export class ComponentPanelConfiguration {
  componentIndicators: ComponentIndicatorConfiguration[];
  column: number;
}
