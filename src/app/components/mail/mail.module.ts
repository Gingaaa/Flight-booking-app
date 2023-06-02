import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailComponent } from './mail.component';
import { MailRoutingModule } from './mail-routing.module';


@NgModule({
  declarations: [
    MailComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule
  ]
})
export class MailModule { }
