import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingconfirmationComponent } from './bookingconfirmation.component';

const routes: Routes = [
  { path: '', component:BookingconfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingconfirmationRoutingModule { }
