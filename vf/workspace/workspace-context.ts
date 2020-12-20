import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Options, SortableEvent } from 'sortablejs';
import { Subject } from 'rxjs';
import { PropertyPanel } from './property-panel';
import { ControlSetting } from './types';


@Injectable()
export class WorkspaceContext {
  private static globalId = 0;

  private _selected: ControlSetting;

  selectedChanges = new Subject<ControlSetting[]>();

  controls: ControlSetting[] = [];


  private readonly groupName: string;

  constructor(private cdr: ChangeDetectorRef,
              private ngZone: NgZone,
              private propertyPanel: PropertyPanel) {
    this.groupName = `sort_group_${WorkspaceContext.globalId++}`;
  }


  get selected(): ControlSetting {
    return this._selected;
  }

  set selected(setting: ControlSetting) {
    this._selected = setting;


    if (setting) {
      this.propertyPanel.createPanel(setting);
    }

    this.cdr.detectChanges();
  }

  get sharedOptions(): Options {
    return { group: { name: this.groupName } };
  }

  drop = (event: SortableEvent) => {
    if (this.shouldReselect(event)) {
      this.ngZone.run(() => (this.selected = this.controls[event.newIndex]));
      this.selectedChanges.next(this.controls);
    }

  };

  delete(control: ControlSetting) {
    this.propertyPanel.clear();
    this.controls = this.controls.filter(e => e !== control);
    this.selected = this.controls.length > 0 ? this.controls[this.controls.length - 1] : null;
    this.selectedChanges.next(this.controls);
  }

  private shouldReselect(event: SortableEvent): boolean {
    const className = 'indicators-container';
    return !event.from.classList.contains(className) || !event.to.classList.contains(className);
  }
}
