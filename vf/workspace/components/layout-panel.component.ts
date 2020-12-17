import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';
import { Options } from 'sortablejs';

@Component({
  selector: 'vf-layout-panel',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [`./styles.less`],
  template: `
    <div [sortablejs]="dcs.controls" [sortablejsOptions]="sortableOptions" class="layout-container">
      <div
        class="sortable-item"
        *ngFor="let control of dcs.controls"
        [ngStyle]="{ width: calculateCssWidth(control.span) }"
        [ngClass]="{ 'sortable-item-selected': isSelected(control) }"
        (click)="dcs.selected = control"
      >
        <div *ngIf="isSelected(control)" class="handle">

        </div>
        {{ control.id }}
        <div *ngIf="isSelected(control)" (click)="dcs.delete(control)" class="delete">

        </div>
      </div>
    </div>
  `
})
export class LayoutPanelComponent implements OnInit, AfterViewInit {
  sortableOptions: Options;

  constructor(public dcs: DragDropService) {
    this.sortableOptions = {
      ...dcs.sharedOptions,
      ...{
        animation: 150,
        revertOnSpill: true,
        handle: '.handle',
        onEnd: this.dcs.drop
      }
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  calculateCssWidth(span: number): string {
    const percent = span / 24;
    return `${percent * 100}%`;
  }

  isSelected(control: any) {
    return this.dcs.selected === control;
  }
}


