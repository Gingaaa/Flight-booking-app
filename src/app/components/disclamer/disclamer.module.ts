import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisclamerRoutingModule } from './disclamer-routing.module';
import { DisclamerComponent } from './disclamer.component';


@NgModule({
  declarations: [
    DisclamerComponent
  ],
  imports: [
    CommonModule,
    DisclamerRoutingModule
  ]
})
export class DisclamerModule { }
