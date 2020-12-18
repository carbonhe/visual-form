import { Injectable, ViewContainerRef, ViewRef } from '@angular/core';
import { PluginService } from '../plugable/plugin.service';
import { VfRenderer } from '../../renderer/vf-renderer.service';
import { VfFormGroup } from '../../renderer/types';

@Injectable({ providedIn: 'root' })
export class PropertyPanelService {
  private panelMapping = new Map<string, ViewRef>();

  public panelContainer: ViewContainerRef;

  constructor(private pluginService: PluginService, private renderer: VfRenderer) {}

  changePanel(props: any) {
    let view = this.panelMapping.get(props.id);
    if (view) {
      for (let i = 0; i < this.panelContainer.length; i++) {
        this.panelContainer.detach(i);
      }
      view.reattach();
    } else {
      const panels = this.pluginService.getPanels(props.indicatorId);

      const controls = {};

      panels.forEach(e => (controls[e.id] = ''));

      const propertyGroup = new VfFormGroup(controls);

      view = this.renderer.render(this.panelContainer, propertyGroup).hostView;

      this.panelMapping.set(props.id, view);
    }
  }

  clear(indicatorId: string) {
    const view = this.panelMapping.get(indicatorId);
    view.destroy();
    this.panelMapping.delete(indicatorId);
  }
}
