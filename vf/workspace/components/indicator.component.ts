import { Component, Input, OnInit } from '@angular/core';
import { VfIndicator } from '../plugable/plugable';

@Component({
  selector: 'vf-indicator',
  styleUrls: ['./styles.less'],
  template: `
    <div class="indicator">
      <ng-template [ngTemplateOutlet]="indicator.icon"></ng-template>
      <span>{{ indicator.title }}</span>
    </div>
  `
})
export class IndicatorComponent implements OnInit {
  @Input()
  indicator: VfIndicator;

  constructor() {
  }

  ngOnInit(): void {
  }
}


