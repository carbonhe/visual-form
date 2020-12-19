import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PropertyPanel } from 'visual-form/workspace/property-panel';

@Component({
  selector: 'vf-property-panel',
  template: `
    <div #propertyContainer>

    </div>
  `,
  styleUrls: [`./styles.less`]
})
export class PropertyPanelComponent implements OnInit {

  @ViewChild('propertyContainer', { read: ViewContainerRef })
  set container(viewContainer: ViewContainerRef) {
    this.propertyService.setViewContainer(viewContainer);
  }

  constructor(private propertyService: PropertyPanel) {
  }

  ngOnInit(): void {
  }
}

