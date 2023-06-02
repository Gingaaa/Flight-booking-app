import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-traveler-details',
  templateUrl: './traveler-details.component.html',
  styleUrls: ['./traveler-details.component.scss'],
})
export class TravelerDetailsComponent implements OnInit {
  addtraveler: FormGroup | any;
  formData: any[] = [];
  emailcount = 1;
  dataedit: any;
  edittraveler: FormGroup | any;
  addtt = 1;
  check: boolean = false;
  value: any;
  editbutton = 1;
  count = 0;
  myFormArray: FormArray | any;
  changedate:any;
  changevalue:number|any;
  @Output() travelerch = new EventEmitter<string>();
  @Output() updateform = new EventEmitter<any[]>();
  formcheck:boolean=false;

  @Input() travelertt: any;
  bookTitle: string="clicked";
  travelercot:number = 1;
  travelercheck:any;
  travelercheckb:boolean=false;

  @ViewChild('formRef', { static: false }) formRef: any | NgForm;

  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = Array.from({ length: 12 }, (_, i) => i + 1);
  years = Array.from({ length: 100 }, (_, i) => 2022 - i);

  constructor(
    private fb: FormBuilder,
    private router: Router,
     private route: ActivatedRoute,
     private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute
     ) {
    this.myFormArray = this.fb.array(
      this.formData.map((item) => this.fb.group(item))
    );
  }

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
    this.addtraveler = this.fb.group({
      gender: ['', Validators.required],
      email: ['', Validators.email],
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      offers: [''],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      age: [''],
    });
    console.log(this.formData.length);
    console.log(this.travelertt);
    
  }

  edit(dataedit: any, i: any) {
    this.travelercheck = i+1;
    this.travelercheckb = true;
    this.value = i;
    if (i === 0) {
      this.emailcount = 1;
    } else {
      this.emailcount = 2;
    }
    this.editbutton = 2;
    const edit = dataedit;
    this.addtraveler.patchValue(edit);
    this.check = false;
  }

  edittravelers() {

    if(this.addtraveler.invalid){
      this.checkf();
      return;
    }

    this.travelercheckb = false;
    const dayedit = this.addtraveler.get('day').value;
    const monthedit = this.addtraveler.get('month').value;
    const yearedit = this.addtraveler.get('year').value;

    const day = parseInt(dayedit, 10);
    const month = parseInt(monthedit, 10);
    const year = parseInt(yearedit, 10);

    const birthdate = new Date(year, month - 1, day);
    const age = this.calculateAge(birthdate);
    this.changedate=age;
    const updatedData = {
      gender: this.addtraveler.get('gender').value,
      email: this.addtraveler.get('email').value,
      firstname: this.addtraveler.get('firstname').value,
      middlename: this.addtraveler.get('middlename').value,
      lastname: this.addtraveler.get('lastname').value,
      offers: this.addtraveler.get('offers').value,
      day: this.addtraveler.get('day').value,
      month: this.addtraveler.get('month').value,
      year: this.addtraveler.get('year').value,
      age: this.changedate,
    };
    this.editbutton = 1;
    this.emailcount = 2;
    if (this.count == this.travelertt) {
      this.check = true;
    }
    this.formData[this.value] = updatedData;
    this.addtraveler.reset();
    this.formRef.resetForm();
  }

  onSubmit() {
    // debugger;

    if(this.addtraveler.invalid){
      this.checkf();
      return;
    }
    
    this.travelercot++;
    this.emailcount++;
    this.addtt++;
    if (this.addtt > this.travelertt) {
      this.check = true;
    }
    this.count++;

    const dayedit = this.addtraveler.get('day').value;
    const monthedit = this.addtraveler.get('month').value;
    const yearedit = this.addtraveler.get('year').value;

    const day = parseInt(dayedit, 10);
    const month = parseInt(monthedit, 10);
    const year = parseInt(yearedit, 10);

    const birthdate = new Date(year, month - 1, day);
    const age = this.calculateAge(birthdate);
    this.changedate=age;
    // console.log( this.changedate);
    this.addtraveler.get('age').setValue(age);
    const data = this.addtraveler.value;
    this.formData.push(data);
    console.log(this.addtraveler.value);
    console.log(this.formData);
    this.addtraveler.reset();
    this.formRef.resetForm();
  }

  private calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  }

change(value:any){
  // this.bookTitleCreated.emit({ title: this.bookTitle });
  // this.changevalue = 2;
  if(value == 'back'){
    this.updateform.emit(this.formData);
    this.travelerch.emit("itenary");
  }
  if(value == 'continue'){
    this.updateform.emit(this.formData);
    this.travelerch.emit("payment");
  }
}

checkf(){
  // console.log("www");
  this.addtraveler.markAllAsTouched();  
}

}
