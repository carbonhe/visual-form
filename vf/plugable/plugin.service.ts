import { Injectable, Type } from '@angular/core';
import { VfIndicator, VfPlatform, VfPlugin, VfProperty } from './plugable';
import { ControlComponent } from '../renderer/types';

@Injectable({
  providedIn: 'root',
})
export class PluginService {
  private _platform: VfPlatform;

  private plugins: VfPlugin[] = [];

  usePlatform(platform: VfPlatform) {
    if (this._platform) {
      throw new Error(`There is a platform '${this._platform.id}' has already be used!`);
    }
    this._platform = platform;
    this.usePlugin(platform);
  }

  get platform(): VfPlatform {
    return this._platform;
  }

  usePlugin(...plugins: VfPlugin[]) {
    if (plugins) {
      plugins.forEach(plugin => {
        if (plugin) {
          this.plugins.push(plugin);
        }
      });
    }
  }

  get indicators(): VfIndicator[] {
    this.checkPlatform();
    return this.plugins.flatMap(plugin => plugin.controlDescriptors.map(e => e.indicator));
  }

  findControl(indicatorId: string): Type<ControlComponent> {
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
    return this.plugins.flatMap(plugin => plugin.controlDescriptors).find(descriptor => descriptor.indicator.id === indicatorId).properties;
  }

  getProperty(propertyId: string): VfProperty {
    return this.plugins
      .flatMap(plugin => plugin.controlDescriptors)
      .flatMap(descriptor => descriptor.properties)
      .find(property => property.propertyKey === propertyId);
  }

  private checkPlatform() {
    if (!this._platform) {
      throw new Error('There is no platform provided!');
    }
  }
}
