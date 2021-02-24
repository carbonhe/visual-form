import { Component } from '@angular/core';
import { IndicatorComponent, VfIndicator } from '../core/plugable/plugable';

@Component({
  template: ` <div class="indicator">
    <i *ngIf="indicator.icon" nz-icon [nzType]="indicator.icon"></i>
    <span>{{ indicator.title }}</span>
  </div>`,
  styles: [
    `
      .indicator {
        background-color: #f5f7fa;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 2px;
        padding-left: 10px;
        cursor: pointer;
        border: 1px dashed transparent;
      }

      .indicator:hover {
        color: #409eff;
        border: 1px dashed #409eff;
      }

      i {
        margin-right: 5px;
      }
    `,
  ],
})
export class AntdIndicatorComponent implements IndicatorComponent {
  indicator: VfIndicator;
}
