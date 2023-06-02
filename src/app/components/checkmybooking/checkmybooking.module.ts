import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckmybookingRoutingModule } from './checkmybooking-routing.module';
import { CheckmybookingComponent } from './checkmybooking.component';


@NgModule({
  declarations: [
    CheckmybookingComponent
  ],
  imports: [
    CommonModule,
    CheckmybookingRoutingModule
  ]
})
export class CheckmybookingModule { }
