import { Injectable, Type } from '@angular/core';
import { VfIndicator, VfPlatform, VfPlugin, VfProperty } from './plugable';
import { FormControlTemplate } from '../renderer/types';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  private _platform: VfPlatform;

  private plugins: VfPlugin[] = [];


  usePlatform(platform: VfPlatform) {
    if (this._platform) {
      throw new Error(`There is a platform '${this._platform.id}' has already be used!`);
    }
    this._platform = platform;
    this.plugins.push(platform);
  }

  get platform(): VfPlatform {
    return this._platform;
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
    return this.plugins.flatMap(plugin => plugin.controlDescriptors.map(e => e.indicator));
  }


  findControl(indicatorId: string): Type<FormControlTemplate> {
    for (const plugin of this.plugins) {
      for (const descriptor of plugin.controlDescriptors) {
        if (descriptor.indicator.id === indicatorId) {
          return descriptor.template;
        }
      }
    }
    throw Error(`There is no component match indicator: ${indicatorId}`);
  }


  getProperties(indicatorId: string): VfProperty[] {
    this.checkPlatform();
    return this.plugins.flatMap(plugin => plugin.controlDescriptors)
      .find(descriptor => descriptor.indicator.id === indicatorId)
      .properties;

  }

  private checkPlatform() {
    if (!this._platform) {
      throw new Error('There is no platform provided!');
    }
  }
}
