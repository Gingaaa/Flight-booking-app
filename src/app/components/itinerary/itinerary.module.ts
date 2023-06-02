import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraryRoutingModule } from './itinerary-routing.module';
import { ItineraryComponent } from './itinerary.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ItineraryDetailsComponent } from './itinerary-details/itinerary-details.component';
import { TravelerDetailsComponent } from './traveler-details/traveler-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    ItineraryComponent,
    ItineraryDetailsComponent,
    TravelerDetailsComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    ItineraryRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class ItineraryModule { }
