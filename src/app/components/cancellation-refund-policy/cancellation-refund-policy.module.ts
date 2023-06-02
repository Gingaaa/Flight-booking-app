import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancellationRefundPolicyRoutingModule } from './cancellation-refund-policy-routing.module';
import { CancellationRefundPolicyComponent } from './cancellation-refund-policy.component';


@NgModule({
  declarations: [
    CancellationRefundPolicyComponent
  ],
  imports: [
    CommonModule,
    CancellationRefundPolicyRoutingModule
  ]
})
export class CancellationRefundPolicyModule { }
