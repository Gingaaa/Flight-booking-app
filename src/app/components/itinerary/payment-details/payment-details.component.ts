import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent implements OnInit {
  payment: FormGroup | any;
  @Input() updatetr: any[] | any;
  @Input() datadt: any;
  data:any;
  @Output() paymentch = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
     private router: Router,
     private viewportScroller: ViewportScroller,
     private activatedRoute: ActivatedRoute
 
     ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
      const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }

    });
  
    this.payment = this.fb.group({
      cardnumber: ['', Validators.required],
      cardname: ['', Validators.required],
      expirydate: ['', Validators.required],
      cvv: ['', Validators.required],
      billdetails: this.fb.group({
        country: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postcode: ['', Validators.required],
      }),
      contactdetails: this.fb.group({
        phoneno: ['', Validators.required],
        phonealt: ['', Validators.required],
        email: ['', Validators.required],
        check: ['', Validators.required],
      }),
    });
    if (this.updatetr.length >= 1) {
      console.log(this.updatetr);
    }
  }
  onSubmit() {
    console.log(this.payment.value);
    console.log(this.updatetr);
    const payment=this.payment;
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     payment:this.payment,
    //     travelers:this.updatetr
    //   }
    // };
    // this.router.navigateByUrl('/bookingconfirmation', { state: this.payment });
    // this.router.navigateByUrl('/list', { state: this.myForm.value });
    this.router.navigateByUrl('/bookingconfirmation', { state: {payment:this.payment.value,travelers:this.updatetr, data:this.datadt} });
    // this.navigateToUser;
  }
  change(value:any){
    // this.bookTitleCreated.emit({ title: this.bookTitle });
    // this.changevalue = 2;
    if(value == 'back'){
      this.paymentch.emit("traveler");
    }
  }

  // navigateToUser() {
  //   this.router.navigate(['/bookingconfirmation'], { queryParams: { payment:this.payment,
  //     travelers:this.updatetr } });
  // }

}
