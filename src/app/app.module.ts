import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualFormAntdModule } from 'visual-form';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  CalendarOutline,
  CheckCircleOutline,
  CheckSquareOutline,
  DeleteTwoTone,
  DragOutline,
  EditOutline,
  FieldNumberOutline,
  FormOutline,
  UnorderedListOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

registerLocaleData(zh);

const icons: IconDefinition[] = [
  DeleteTwoTone,
  DragOutline,
  EditOutline,
  FieldNumberOutline,
  FormOutline,
  UnorderedListOutline,
  CalendarOutline,
  CheckCircleOutline,
  CheckSquareOutline,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    VisualFormAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzIconModule.forRoot(icons),
    NzSwitchModule,
    NzLayoutModule,
    NzButtonModule,
    NzModalModule,
    NzNotificationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
