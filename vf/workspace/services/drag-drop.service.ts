import { ChangeDetectorRef, Injectable, NgZone, ViewContainerRef } from '@angular/core';
import { Options, SortableEvent } from 'sortablejs';
import { Subject } from 'rxjs';
import { PropertyPanelService } from './property-panel.service';

@Injectable()
export class DragDropService {
  private static globalId = 0;

  private _selected: any;

  selectedChanges = new Subject<any[]>();

  controls: any[] = [];


  panelContainerRef: ViewContainerRef;

  private readonly groupName: string;

  constructor(private cdr: ChangeDetectorRef,
              private ngZone: NgZone,
              private panelService: PropertyPanelService) {
    this.groupName = `sort_group_${DragDropService.globalId++}`;
  }


  get selected(): any {
    return this._selected;
  }

  set selected(props: any) {
    this._selected = props;

    this.panelService.changePanel(props);

    this.cdr.detectChanges();
  }

  get sharedOptions(): Options {
    return { group: { name: this.groupName } };
  }

  drop = (event: SortableEvent) => {
    this.ngZone.run(() => (this.selected = this.controls[event.newIndex]));
    this.selectedChanges.next(this.controls);
  };

  delete(control: any) {
    this.panelService.clear(control.id);
    this.controls = this.controls.filter(e => e !== control);
    this.selected = this.controls.length > 0 ? this.controls[this.controls.length - 1] : null;
    this.selectedChanges.next(this.controls);
  }
}
