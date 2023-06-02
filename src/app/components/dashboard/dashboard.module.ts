import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {  ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AngularDropdownModule } from 'angular-dropdown';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatFormFieldModule } from "@angular/material/form-field";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
    CarouselModule,
    MatMomentDateModule,
    MatFormFieldModule
  ],
  providers: [ToastrService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
