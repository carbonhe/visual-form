import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkspaceContext } from '../workspace-context';
import { PropertyPanel } from '../property-panel';
import { ControlSetting } from 'visual-form/workspace/types';
import { VfRenderer } from 'visual-form/renderer/renderer';

@Component({
  selector: 'vf-workspace',
  template: `
    <div class="main-layout">
      <div class="component-panel">
        <vf-component-panel></vf-component-panel>
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
  providers: [WorkspaceContext, PropertyPanel, VfRenderer],
})
export class WorkspaceComponent implements OnInit {
  constructor(private _dcs: WorkspaceContext) {}

  @Input()
  controls: ControlSetting[];

  @Output()
  controlsChange = new EventEmitter<ControlSetting[]>();

  ngOnInit(): void {
    this._dcs.controls = this.controls || [];
    this._dcs.selectedChanges.subscribe(r => this.controlsChange.emit(r));
  }
}
