import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailerRoutingModule } from './emailer-routing.module';
import { EmailerComponent } from './emailer.component';


@NgModule({
  declarations: [
    EmailerComponent
  ],
  imports: [
    CommonModule,
    EmailerRoutingModule
  ]
})
export class EmailerModule { }
