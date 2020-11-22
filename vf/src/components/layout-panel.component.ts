import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DragConnectionService } from '../services/drag-connection.service';
import { Options } from 'sortablejs';
import { PropertyModel } from '../spi/component-provider';
import { limitedNumber } from '../utils/function';

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
        (click)="dcs.selectedControl = control"
      >
        <div *ngIf="isSelected(control)" class="handle">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024">
              <path
                fill="white"
                d="M909.3 506.3L781.7 405.6a7.23 7.23 0 0 0-11.7 5.7V476H548V254h64.8c6 0 9.4-7 5.7-11.7L517.7 114.7a7.14 7.14 0 0 0-11.3 0L405.6 242.3a7.23 7.23 0 0 0 5.7 11.7H476v222H254v-64.8c0-6-7-9.4-11.7-5.7L114.7 506.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h222v222h-64.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V548h222v64.8c0 6 7 9.4 11.7 5.7l127.5-100.8a7.3 7.3 0 0 0 .1-11.4z"
              />
            </svg>
          </span>
        </div>
        {{ control.id }}
        <div *ngIf="isSelected(control)" (click)="dcs.delete(control)" class="delete">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024">
              <path
                fill="white"
                d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  `,
})
export class LayoutPanelComponent implements OnInit, AfterViewInit {
  sortableOptions: Options;

  constructor(public dcs: DragConnectionService) {
    this.sortableOptions = {
      ...dcs.sharedOptions,
      ...{
        animation: 150,
        revertOnSpill: true,
        handle: '.handle',
        onEnd: this.dcs.drop,
      },
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  calculateCssWidth(span: number): string {
    span = limitedNumber(span, 2, 24);
    const percent = span / 24;
    return `${percent * 100}%`;
  }

  isSelected(control: PropertyModel) {
    return this.dcs.selectedControl === control;
  }
}

export class LayoutPanelConfiguration {}
