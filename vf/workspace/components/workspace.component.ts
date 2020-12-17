import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';

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
  providers: [DragDropService]
})
export class WorkspaceComponent implements OnInit {

  constructor(private _dcs: DragDropService) {
  }

  @Input()
  controls: any[];

  @Output()
  controlsChange = new EventEmitter<any[]>();

  ngOnInit(): void {
    this._dcs.controls = this.controls || [];
    this._dcs.selectedChanges.subscribe(r => this.controlsChange.emit(r));
  }
}
