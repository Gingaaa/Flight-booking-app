import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermAndConditionsRoutingModule } from './term-and-conditions-routing.module';
import { TermAndConditionsComponent } from './term-and-conditions.component';


@NgModule({
  declarations: [
    TermAndConditionsComponent
  ],
  imports: [
    CommonModule,
    TermAndConditionsRoutingModule
  ]
})
export class TermAndConditionsModule { }
