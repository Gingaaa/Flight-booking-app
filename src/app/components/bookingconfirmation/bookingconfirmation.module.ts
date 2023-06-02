import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingconfirmationRoutingModule } from './bookingconfirmation-routing.module';
import { BookingconfirmationComponent } from './bookingconfirmation.component';


@NgModule({
  declarations: [
    BookingconfirmationComponent
  ],
  imports: [
    CommonModule,
    BookingconfirmationRoutingModule
  ]
})
export class BookingconfirmationModule { }
