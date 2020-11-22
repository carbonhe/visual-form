import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentManagerService } from '../services/component-manager.service';
import { ComponentPanelConfiguration } from './component-panel.component';
import { DragConnectionService } from '../services/drag-connection.service';
import { PropertyModel } from '..';

@Component({
  selector: 'vf-workspace',
  template: `
    <div class="main-layout">
      <div class="component-panel">
        <vf-component-panel [cfg]="componentPanelConfiguration"></vf-component-panel>
      </div>
      <div class="layout-panel">
        <vf-layout-panel></vf-layout-panel>
      </div>
      <div class="property-panel">
        <vf-property-panel></vf-property-panel>
      </div>
    </div>
  `,
  styleUrls: ['./styles.less'],
  providers: [DragConnectionService],
})
export class WorkspaceComponent implements OnInit {
  componentPanelConfiguration = new ComponentPanelConfiguration();

  constructor(componentManagerService: ComponentManagerService, private _dcs: DragConnectionService) {
    this.componentPanelConfiguration.componentIndicators = componentManagerService.getIndicatorConfigurations();
    this.componentPanelConfiguration.column = 2;
  }

  @Input()
  controls: PropertyModel[];

  @Output()
  controlsChange = new EventEmitter<PropertyModel[]>();

  ngOnInit(): void {
    this._dcs.controls = this.controls || [];
    this._dcs.controlChanges.subscribe(r => this.controlsChange.emit(r));
  }
}

export class WorkspaceConfiguration {}
