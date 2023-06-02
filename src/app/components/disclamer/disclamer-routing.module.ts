import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisclamerComponent } from './disclamer.component';

const routes: Routes = [
  { path: '', component: DisclamerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisclamerRoutingModule { }
