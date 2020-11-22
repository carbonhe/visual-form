import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'vf-component-indicator',
  styleUrls: ['./styles.less'],
  template: `
    <div class="indicator">
      <ng-template [ngTemplateOutlet]="cfg.icon"></ng-template>
      <span>{{ cfg.name }}</span>
    </div>
  `,
})
export class ComponentIndicatorComponent implements OnInit {
  @Input()
  cfg: ComponentIndicatorConfiguration;

  constructor() {}

  ngOnInit(): void {}
}

export class ComponentIndicatorConfiguration {
  constructor(public icon: TemplateRef<void>, public id: string, public name: string) {}
}
