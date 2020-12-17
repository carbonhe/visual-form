import { Injectable, Type } from '@angular/core';
import { VfIndicator, VfPanel, VfPlatform, VfPlugin } from './plugable';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  private platform: VfPlatform;

  private plugins: VfPlugin[] = [];

  usePlatform(platform: VfPlatform) {
    if (this.platform) {
      throw new Error(`There is a platform '${this.platform.id}' has already be used!`);
    }
    this.platform = platform;
  }

  usePlugin(...plugin: VfPlugin[]) {
    if (plugin) {
      plugin.forEach(p => {
        if (p) {
          this.plugins.push(p);
        }
      });
    }
  }

  get indicators(): VfIndicator[] {
    this.checkPlatform();
    const indicatorsInPlatform = this.platform.controlMap.keys();
    const indicatorsInPlugin = this.plugins.flatMap(e => Array.from(e.controlMap.keys()));
    return [...indicatorsInPlatform, ...indicatorsInPlugin];
  }

  get rendererType(): Type<any> {
    return this.platform.rendererType;
  }

  getPanels(indicatorId: string): VfPanel<any>[] {
    this.checkPlatform();
    return [...this.platform.panels, ...this.plugins.flatMap(e => e.panels)]
      .filter(e => e.apply(indicatorId))
      .sort((a, b) => a.order - b.order);
  }

  private checkPlatform() {
    if (!this.platform) {
      throw new Error('There is no platform provided!');
    }
  }
}
