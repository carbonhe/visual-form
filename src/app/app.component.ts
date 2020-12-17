import { Component } from '@angular/core';
import { RenderComponent } from 'visual-form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private modal: NzModalService) {
  }

  controls: any[];

  preview() {
    this.modal.create({
      nzTitle: 'preview',
      nzContent: RenderComponent,
      nzComponentParams: {
        controls: this.controls
      }
    });
  }
}
