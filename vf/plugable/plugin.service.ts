import { Injectable, Type } from '@angular/core';
import { VfIndicator, VfPanel, VfPlatform, VfPlugin } from './plugable';
import { FormControlTemplate, FormControlWrapperTemplate, FormGroupTemplate } from '../renderer/types';

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
    this.plugins.push(platform);
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
    return this.plugins.flatMap(e => Array.from(e.controlMap.keys()));
  }

  get propertyPanelGroup(): Type<FormGroupTemplate> {
    return this.platform.propertyPanelGroup;
  }

  get rootGroup(): Type<FormGroupTemplate> {
    return this.platform.rootGroup;
  }

  get defaultControlWrapper(): Type<FormControlWrapperTemplate> {
    return this.platform.defaultControlWrapper;
  }


  findControl(indicatorId: string): Type<FormControlTemplate> {
    for (const plugin of this.plugins) {
      for (const [k, v] of plugin.controlMap) {
        if (k.id === indicatorId) {
          return v;
        }
      }
    }
    throw Error(`There is no component match indicator: ${indicatorId}`);
  }


  getPanels(indicatorId: string): VfPanel<any>[] {
    this.checkPlatform();
    return [...this.platform.panels, ...this.plugins.flatMap(e => e.panels)]
      .filter(e => !e.apply || e.apply(indicatorId))
      .sort((a, b) => a.order - b.order);
  }

  private checkPlatform() {
    if (!this.platform) {
      throw new Error('There is no platform provided!');
    }
  }
}
