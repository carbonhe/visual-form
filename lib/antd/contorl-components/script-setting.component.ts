import { Component, TemplateRef, ViewChild } from '@angular/core';
import { JoinedEditorOptions } from 'ng-zorro-antd/code-editor';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ControlComponent, VfFormControl } from '../../core/renderer/types';

@Component({
  template: `
    <div class="container">
      <nz-code-editor
        class="preview-editor"
        [ngModel]="control.value"
        [nzEditorOption]="{ readOnly: true, lineNumbers: 'off', minimap: { enabled: false } }"
      ></nz-code-editor>
      <div class="action">
        <i nz-tooltip="点击进入编辑" nz-icon nzType="edit" (click)="openEditor()"></i>
      </div>
    </div>
    <ng-template #editorTpl>
      <nz-code-editor class="editor" [nzEditorOption]="control.props.options" [(ngModel)]="code"></nz-code-editor>
    </ng-template>
  `,
  styles: [
    `
      .container {
        position: relative;
      }

      .editor {
        height: 400px;
      }

      .preview-editor {
        height: 200px;
        border: #ded2d2 solid 1px;
      }

      .action {
        position: absolute;
        left: 0;
        bottom: 0;
      }

      i {
        font-size: 1.5em;
        opacity: 0.4;
        cursor: pointer;
        transition: all ease-in-out 0.5s;
      }

      i:hover {
        opacity: 1;
      }
    `,
  ],
})
export class ScriptSettingComponent implements ControlComponent<CodeEditorProps> {
  @ViewChild('editorTpl') editorContent: TemplateRef<any>;

  control: VfFormControl<CodeEditorProps>;

  code: string;

  constructor(private modal: NzModalService) {}

  openEditor() {
    this.code = this.control.value;
    this.modal.create({
      nzTitle: '配置Javascript',
      nzContent: this.editorContent,
      nzWidth: 800,
      nzOnCancel: _ => (this.code = ''),
      nzOnOk: _ => {
        this.control.patchValue(this.code);
        this.code = '';
      },
    });
  }
}

export interface CodeEditorProps {
  options: JoinedEditorOptions;
}
