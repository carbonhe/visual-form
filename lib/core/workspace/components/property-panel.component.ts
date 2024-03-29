import { Component, ComponentRef, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { VfRenderer } from '../../renderer/renderer';
import { ControlSetting, VF_PATCHES } from '../types';
import { PluginService } from '../../plugable/plugin.service';
import { VfFormControl, VfFormGroup } from '../../renderer/types';
import { VfProperty } from '../../plugable/plugable';

@Component({
  selector: 'vf-property-panel',
  template: ``,
  styleUrls: [`./styles.less`],
  providers: [VfRenderer],
})
export class PropertyPanelComponent implements OnInit, OnChanges {
  @Input() control: ControlSetting;

  private viewMap = new Map<string, ComponentRef<any>>();

  private current: [string, ComponentRef<any>];

  constructor(private viewContainer: ViewContainerRef, private pluginService: PluginService, private renderer: VfRenderer) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { firstChange, previousValue, currentValue } = changes.control;
    if (firstChange && previousValue === currentValue) {
      return;
    }
    if (!currentValue) {
      if (this.current) {
        this.viewMap.delete(this.current[0]);
        this.current[1].destroy();
        this.current = null;
      }
    } else {
      if (this.current) {
        this.hide(this.current[1]);
      }
      let ref = this.viewMap.get(currentValue.id);
      if (ref) {
        this.show(ref);
        this.current = [currentValue.id, ref];
      } else {
        ref = this.rerender(currentValue);
        this.viewMap.set(currentValue.id, ref);
        this.current = [currentValue.id, ref];
      }
    }
  }

  private hide(ref: ComponentRef<any>) {
    (ref.location.nativeElement as HTMLElement).style.cssText = 'display:none';
  }

  private show(ref: ComponentRef<any>) {
    (ref.location.nativeElement as HTMLElement).style.cssText = 'display:unset';
  }

  private rerender(setting: ControlSetting): ComponentRef<any> {
    const properties = this.pluginService.getProperties(setting.indicatorId);

    const controls: { [key: string]: VfFormControl<any> } = {};

    properties.forEach(property => {
      const control = new VfFormControl(property.component, this.pluginService.platform.defaultWrapperComponent, {
        ...property.componentProps,
        id: property.propertyKey,
        title: property.title,
      });

      control.valueChanges.subscribe(value => {
        setting[property.propertyKey] = value;
        if (property.patch) {
          this.addPatch(property, setting);
        }
      });

      if (control.pristine && property.defaultValue !== undefined) {
        control.patchValue(this.clone(property.defaultValue));
      }

      controls[property.propertyKey] = control;
    });

    const group = new VfFormGroup(
      this.pluginService.platform.propertyGroup.component,
      controls,
      this.pluginService.platform.propertyGroup.props
    );

    // Avoid patch value with the patches set
    const settingCopy = { ...setting };
    delete settingCopy[VF_PATCHES];

    const componentRef = this.renderer.render(this.viewContainer, group);

    /**
     * It is very important to make sure that all internal controls patch value before the group
     */
    setTimeout(() => group.patchValue(settingCopy));

    return componentRef;
  }

  private clone(source: any): any {
    if (typeof source === 'object' || typeof source === 'function') {
      return JSON.parse(JSON.stringify(source));
    }
    return source;
  }

  private addPatch(property: VfProperty, setting: ControlSetting) {
    setting[VF_PATCHES] = setting[VF_PATCHES] ?? new Set<string>();
    (setting[VF_PATCHES] as Set<string>).add(property.propertyKey);
  }
}
