import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Options, SortableEvent } from 'sortablejs';
import { PropertyModel } from '..';
import { ComponentManagerService } from '../services/component-manager.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Injectable()
export class DragConnectionService {
  private static globalId = 0;

  private _selectedControl: PropertyModel;

  private _currentPropertyPortal: ComponentPortal<any>;
  private _currentCommonPropertyPortal: ComponentPortal<any>;

  controlChanges = new Subject<PropertyModel[]>();

  controls: PropertyModel[] = [];

  private readonly groupName: string;

  constructor(private cdr: ChangeDetectorRef, private componentManager: ComponentManagerService, private ngZone: NgZone) {
    this.groupName = `sort_group_${DragConnectionService.globalId++}`;
  }

  get currentPropertyPortal(): ComponentPortal<any> {
    return this._currentPropertyPortal;
  }

  get currentCommonPropertyPortal(): ComponentPortal<any> {
    return this._currentCommonPropertyPortal;
  }

  get selectedControl(): PropertyModel {
    return this._selectedControl;
  }

  set selectedControl(model: PropertyModel) {
    if (model == null) {
      this._currentPropertyPortal = null;
      this._currentCommonPropertyPortal = null;
    } else {
      const provider = this.componentManager.getProviderById(model.componentId);
      this._currentPropertyPortal = provider.getPropertyComponentType ? new ComponentPortal(provider.getPropertyComponentType()) : null;
      this._currentCommonPropertyPortal = new ComponentPortal(this.componentManager.getCommonPropertyComponent());
    }

    this._selectedControl = model;
    this.cdr.detectChanges();
  }

  get sharedOptions(): Options {
    return { group: { name: this.groupName } };
  }

  drop = (event: SortableEvent) => {
    this.ngZone.run(() => (this.selectedControl = this.controls[event.newIndex]));
    this.controlChanges.next(this.controls);
  };

  delete(control: PropertyModel) {
    this.controls = this.controls.filter(e => e !== control);
    this.selectedControl = this.controls.length > 0 ? this.controls[this.controls.length - 1] : null;
    this.controlChanges.next(this.controls);
  }
}
