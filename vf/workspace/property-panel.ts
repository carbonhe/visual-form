import { Injectable, ViewContainerRef } from '@angular/core';
import { PluginService } from '../plugable/plugin.service';
import { VfFormControl, VfFormGroup } from '../renderer/types';
import { VfRenderer } from '../renderer/renderer';
import { ControlSetting, VF_PATCHES } from './types';
import { VfProperty } from 'visual-form/plugable/plugable';

@Injectable()
export class PropertyPanel {
  private viewContainer: ViewContainerRef;

  constructor(private pluginService: PluginService, private renderer: VfRenderer) {
  }

  createPanel(setting: ControlSetting) {
    this.viewContainer.clear();

    const properties = this.pluginService.getProperties(setting.indicatorId);

    const controls: { [key: string]: VfFormControl<any> } = {};

    properties.forEach(property => {
      const control = new VfFormControl(property.template, this.pluginService.platform.defaultWrapperComponent, {
        ...property.templateProps,
        id: property.propertyKey,
        title: property.title
      });

      control.valueChanges.subscribe(value => {
        setting[property.propertyKey] = value;
        if (property.patch) {
          this.addPatch(property, setting);
        }
      });

      controls[property.propertyKey] = control;
    });

    const group = new VfFormGroup(this.pluginService.platform.propertyGroup.component, controls, this.pluginService.platform.propertyGroup.props);

    // Avoid patch value with the patches set
    const settingCopy = { ...setting };
    delete settingCopy[VF_PATCHES];

    this.renderer.render(this.viewContainer, group);

    /**
     * It is very important to make sure that all internal controls patch value before the group
     */
    setTimeout(() => group.patchValue(settingCopy));
  }

  clear() {
    this.viewContainer.clear();
  }

  setViewContainer(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
  }

  private addPatch(property: VfProperty, setting: ControlSetting) {
    setting[VF_PATCHES] = setting[VF_PATCHES] ?? new Set<string>();
    (setting[VF_PATCHES] as Set<string>).add(property.propertyKey);
  }
}
