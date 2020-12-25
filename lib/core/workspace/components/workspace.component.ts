import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkspaceContext } from '../workspace-context';
import { ControlSetting } from '../types';

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
        <vf-property-panel [control]="workspaceContext.selected"></vf-property-panel>
      </div>
    </div>
  `,
  styleUrls: ['./styles.less'],
  providers: [WorkspaceContext],
})
export class WorkspaceComponent implements OnInit {
  constructor(public workspaceContext: WorkspaceContext) {}

  @Input()
  controls: ControlSetting[];

  @Output()
  controlsChange = new EventEmitter<ControlSetting[]>();

  ngOnInit(): void {
    this.workspaceContext.controls = this.controls || [];
    this.workspaceContext.selectedChanges.subscribe(r => this.controlsChange.emit(r));
  }
}
