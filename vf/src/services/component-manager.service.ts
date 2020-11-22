import { Inject, Injectable, Type } from '@angular/core';
import { COMMON_PROPERTY_COMPONENT, COMPONENT_PROVIDERS, ComponentProvider } from '../spi/component-provider';
import { ComponentIndicatorConfiguration } from '../components/component-indicator.component';

@Injectable({ providedIn: 'root' })
export class ComponentManagerService {
  constructor(
    @Inject(COMPONENT_PROVIDERS)
    private componentProviders: ComponentProvider<any, any, any>[],
    @Inject(COMMON_PROPERTY_COMPONENT)
    private commonPropertyComponent: Type<any>
  ) {}

  getIndicatorConfigurations(): ComponentIndicatorConfiguration[] {
    return this.componentProviders.map(e => new ComponentIndicatorConfiguration(null, e.getId(), e.getName()));
  }

  getProviderById(id: string) {
    return this.componentProviders.find(e => e.getId() === id);
  }

  getCommonPropertyComponent(): Type<any> {
    return this.commonPropertyComponent;
  }
}
