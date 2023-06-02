import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsToMiamiRoutingModule } from './flights-to-miami-routing.module';
import { FlightsToMiamiComponent } from './flights-to-miami.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AngularDropdownModule } from 'angular-dropdown';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    FlightsToMiamiComponent
  ],
  imports: [
    CommonModule,
    FlightsToMiamiRoutingModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    Daterangepicker,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    NgxDaterangepickerMd.forRoot(),
    AngularDropdownModule,
    ToastrModule.forRoot(),
    MatMomentDateModule,
    MatFormFieldModule
  ],
  providers: [ToastrService]
})
export class FlightsToMiamiModule { }
