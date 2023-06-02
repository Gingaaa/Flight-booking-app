import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

import {  ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { PopUpComponent } from './pop-up/pop-up.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import { AngularDropdownModule } from 'angular-dropdown';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatFormFieldModule } from "@angular/material/form-field";


@NgModule({
  declarations: [
    ListComponent,
    PopUpComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    Daterangepicker,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatSliderModule,
    AngularDropdownModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgxSliderModule,
    CarouselModule,
    MatMomentDateModule,
    MatFormFieldModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListModule { }
