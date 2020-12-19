import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ControlSetting } from 'visual-form/workspace/types';
import { VfContainerComponent } from 'visual-form/renderer/container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private modal: NzModalService) {
  }

  controls: ControlSetting[] = [];

  preview() {
    this.modal.create({
      nzTitle: 'preview',
      nzContent: VfContainerComponent,
      nzComponentParams: {
        controls: this.controls
      }
    });
  }
}
