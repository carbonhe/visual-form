import { Injectable, ViewContainerRef } from '@angular/core';
import { PluginService } from '../plugable/plugin.service';
import { VfFormControl, VfFormGroup } from '../renderer/types';
import { VfRenderer } from '../renderer/renderer';
import { ControlSetting, VF_METADATA } from './types';
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
      const control = new VfFormControl(property.template, this.pluginService.platform.defaultControlWrapper, {
        id: property.id,
        title: property.title,
        ...(property.templateProps ?? {})
      });

      control.valueChanges.subscribe(v => {
        setting[property.id] = v;
        if (property.transformer) {
          this.saveMetadata(property, setting, v);
        }
      });

      controls[property.id] = control;
    });


    const group = new VfFormGroup(this.pluginService.platform.propertyPanelGroup, controls);

    // Avoid patch value with metadata
    const settingCopy = { ...setting };
    delete settingCopy[VF_METADATA];

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

  private saveMetadata(panel: VfProperty, setting: ControlSetting, controlValue: any) {

    setting[VF_METADATA] = setting[VF_METADATA] ?? {};

    setting[VF_METADATA][panel.id] = panel.transformer.generate(controlValue);

  }
}

