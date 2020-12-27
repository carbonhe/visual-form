import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { VfIndicator } from '../../plugable/plugable';
import { PluginService } from '../../plugable/plugin.service';

@Component({
  selector: 'vf-indicator',
  styleUrls: ['./styles.less'],
  template: ` <ng-container #container> </ng-container> `,
})
export class IndicatorComponent {
  @Input()
  indicator: VfIndicator;

  constructor(private pluginService: PluginService, private cfr: ComponentFactoryResolver) {}

  @ViewChild('container', { read: ViewContainerRef })
  set viewContainer(container: ViewContainerRef) {
    container.clear();
    const factory = this.cfr.resolveComponentFactory(this.pluginService.platform.indicatorComponent);
    const ref = container.createComponent(factory);
    ref.instance.indicator = this.indicator;
    ref.changeDetectorRef.detectChanges();
  }
}
