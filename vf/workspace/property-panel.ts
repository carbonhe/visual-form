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

    const panels = this.pluginService.getProperties(setting.indicatorId);

    const controls: { [key: string]: VfFormControl } = {};

    panels.forEach(panel => {
      const control = new VfFormControl(panel.template, this.pluginService.platform.defaultControlWrapper, {
        id: panel.id,
        title: panel.title,
        ...(panel.templateProps ?? {})
      });

      control.valueChanges.subscribe(v => {
        setting[panel.id] = v;
        if (panel.transformer) {
          this.saveMetadata(panel, setting, v);
        }
      });

      controls[panel.id] = control;
    });


    const group = new VfFormGroup(this.pluginService.platform.propertyPanelGroup, controls);

    // Avoid patch value with metadata
    const settingCopy = { ...setting };
    delete settingCopy[VF_METADATA];
    group.patchValue(settingCopy);

    this.renderer.render(this.viewContainer, group);

  }

  clear() {
    this.viewContainer.clear();
  }

  setViewContainer(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
  }

  private saveMetadata(panel: VfProperty<any>, setting: ControlSetting, controlValue: any) {

    setting[VF_METADATA] = setting[VF_METADATA] ?? {};

    setting[VF_METADATA][panel.id] = panel.transformer.generate(controlValue);

  }
}

