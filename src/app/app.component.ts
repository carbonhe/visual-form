import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ControlSetting } from 'visual-form/core/workspace/types';
import { RendererComponent } from 'visual-form';
import { FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  private form: FormGroup;

  constructor(private modal: NzModalService, private notification: NzNotificationService) {}

  controls: ControlSetting[] = [];

  preview() {
    const modal = this.modal.create({
      nzTitle: '表单',
      nzContent: RendererComponent,
      nzComponentParams: {
        controls: this.controls,
      },
      nzOnOk: () => this.logFormValue(),
      nzOkDisabled: true,
    });
    modal.componentInstance.afterRendered.subscribe(form => {
      this.form = form;
      modal.updateConfig({ nzOkDisabled: this.form.invalid });
      this.form.valueChanges.subscribe(_ => {
        modal.updateConfig({ nzOkDisabled: this.form.invalid });
      });
    });
  }

  private logFormValue() {
    console.log(this.form.value);
    this.notification.info('表单数据', `<pre>${JSON.stringify(this.form.value, null, 2)}</pre>`);
  }
}
