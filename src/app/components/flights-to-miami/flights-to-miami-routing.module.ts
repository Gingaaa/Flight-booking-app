import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsToMiamiComponent } from './flights-to-miami.component';
import { ToastrService } from 'ngx-toastr';

const routes: Routes = [
  { path: '', component: FlightsToMiamiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsToMiamiRoutingModule { }
