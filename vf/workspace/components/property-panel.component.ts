import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';

@Component({
  selector: 'vf-property-panel',
  template: `
    <div class="property-container">

    </div>
  `,
  styleUrls: [`./styles.less`]
})
export class PropertyPanelComponent implements OnInit {
  constructor(public dragDropService: DragDropService, private viewContainer: ViewContainerRef) {
    dragDropService.panelContainerRef = viewContainer;
  }

  ngOnInit(): void {
  }
}

