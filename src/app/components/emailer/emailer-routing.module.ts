import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailerComponent } from './emailer.component';

const routes: Routes = [
  { path: '', component:EmailerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailerRoutingModule { }
