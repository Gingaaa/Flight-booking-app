import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckmybookingComponent } from './checkmybooking.component';

const routes: Routes = [
  { path: 'checkmybooking', component: CheckmybookingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckmybookingRoutingModule { }
