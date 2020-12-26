import { AfterViewInit, Component, forwardRef } from '@angular/core';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'option-setting',
  template: `
    <div [@.disabled]="!viewInitialized" class="drag-list" cdkDropList (cdkDropListDropped)="drop($event)">
      <nz-input-group @queue class="drag" cdkDrag *ngFor="let option of options" nzSize="small">
        <i cdkDragHandle nz-icon nz-col nzType="drag" nzSpan="2" nzTheme="outline"></i>
        <input nz-col nzSpan="8" type="text" (ngModelChange)="emitValue()" [(ngModel)]="option.label" nz-input />
        <input nz-col nzSpan="8" type="text" (ngModelChange)="emitValue()" [(ngModel)]="option.value" nz-input />
        <i nz-icon nzType="delete" nz-col nzSpan="2" nzTwotoneColor="#ff4d4f" (click)="remove(option)" nzTheme="twotone"></i>
      </nz-input-group>
    </div>
    <button nz-button nzType="link" (click)="add()">添加</button>
  `,
  animations: [
    trigger('queue', [
      transition('* => void', [
        animate(
          '200ms ease-in-out',
          style({
            transform: 'translateY(-10px)',
            opacity: 0,
            height: 0,
          })
        ),
      ]),
      transition('void => *', [
        style({ transform: 'translateY(-10px)', opacity: 0, height: 0 }),
        animate('200ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1, height: '*' })),
      ]),
    ]),
  ],
  styles: [
    `
      nz-input-group {
        margin: 3px;
        display: flex;
        background-color: white;
      }

      i {
        font-size: 1.5em;
        display: inline;
        cursor: pointer;
      }

      input {
        margin-left: 2px;
        margin-right: 2px;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0.1;
      }

      .cdk-drag-animating {
        transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);
      }

      .drag-list.cdk-drop-list-dragging .drag:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionSettingControl),
      multi: true,
    },
  ],
})
export class OptionSettingControl implements ControlValueAccessor, AfterViewInit {
  options: NzSelectOptionInterface[] = [];

  viewInitialized = false;

  private onChange: OnChangeType;

  private onTouch: OnTouchedType;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  drop(event: CdkDragDrop<NzSelectOptionInterface[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(options: NzSelectOptionInterface[]): void {
    this.options = options;
  }

  remove(option: NzSelectOptionInterface) {
    this.options = this.options.filter(e => e !== option);
    this.emitValue();
  }

  emitValue() {
    this.onChange(this.options);
  }

  add() {
    this.options = [...this.options, { label: '请设置label', value: '请设置value' }];
    this.emitValue();
  }
}
