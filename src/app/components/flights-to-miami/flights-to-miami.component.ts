import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import airport from '../../json/airports.json';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {  NavigationEnd  } from '@angular/router';
import { ViewportScroller } from '@angular/common';


export const MY_FORMATS = {
  parse: {
    dateInput: "DD-MMM-yyyy"
  },
  display: {
    dateInput: "DD-MMM-yyyy",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-flights-to-miami',
  templateUrl: './flights-to-miami.component.html',
  styleUrls: ['./flights-to-miami.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class FlightsToMiamiComponent implements OnInit {
  // @ViewChild('picker', { static: false }) picker: ElementRef | any;
  // @ViewChild('picker', { static: false }) pickerr: ElementRef | any;

  placeholderText = 'Depart';
  placeholderText2 = 'Return';
  adultlimit: boolean = false;
  showToaster = true;
  formcheck: boolean = false;

  minDate = new Date();
  minDate1: Date | any;

  data: any[] = [];
  flightdata: any | any[];
  flightCode: any | any[];
  filteredData: any[] = [];
  filteredData2: any[] = [];
  // flightList: { name: String; code: String }[] = airport;
  // flightList2: { name: String; code: String }[] = airport;
  flightList: any[] = airport;
  flightList2: any[] = airport;
  isInputDisabled: boolean = true;

  date = new FormControl(new Date());
  // serializedDate = new Date().toISOString();
  currentDate: Date = new Date();
  // selectedDate = new Date();

  date1: Date | any;
  date2: Date | any;

  travelclass: string = 'Economy';
  departtext: boolean = false;
  wheretext: string | any;

  startDate: Date = new Date();
  endDate: Date = new Date();
  datepicker: any | Date;

  selectedDate: Date|any;
  formattedDate: string|any;

  ecocheck: boolean = true;
  buscheck: boolean = false;
  fircheck: boolean = false;
  precheck: boolean = false;

  // selected: any|{start: Date, end: Date};

  slide: string = 'assets/images/slide-1.jpg';
  slide2: string = 'assets/images/slide-2.jpg';
  slide3: string = 'assets/images/slide-2.jpg';
  slide4: string = 'assets/images/slide-4.jpg';

  focuscond: boolean = false;

  hideone: any;
  ttotal: Number | any;
  adults: Number | any;
  child: Number | any;
  infant: Number | any;

  matchvv: boolean = false;

  daterr:any;
  dateoo:any;

  date2ch: any;

  validationadd: number = 0;
  departcount: number = 0;

  myDate: Date | any;
  datefort: string | any;

  @ViewChild('picker2') picker2: MatDatepicker<Date> | any;
  @ViewChild('picker1') picker1: MatDatepicker<Date> | any;

  @ViewChild('input1') input1: ElementRef | any;
  // @ViewChild('input1') input1: ElementRef<HTMLInputElement>|any;
  @ViewChild('input2') input2: ElementRef | any;

  // @ViewChildren('input1, input2') inputs: QueryList<ElementRef>|any;

  public daterange: any = {};
  state: any;
  auto: any;
  myForm: FormGroup | any;
  filteredStates: Observable<any[]> | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2,
 private viewportScroller: ViewportScroller,
 private activatedRoute: ActivatedRoute
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }
  // http://172.17.10.23:82/api/flight/SearchFlights

  
  // apidata:any;
  // postData() {
  //   const data = {
  //     searchID: 0,
  //     portalID: 204,
  //     originCode: "LAX",
  //     originCityCode: "LAX",
  //     destCode: "JFK",
  //     destCityCode: "NYC",
  //     departureDate: "2023-05-10",
  //     returnDate: "2023-05-19",
  //     senior: 0,
  //     adult: 1,
  //     child: 0,
  //     infant: 0,
  //     infantInLap: 0,
  //     tripType: 2,
  //     cabinClass: 1,
  //     preferredCarrier: null,
  //     customerIpAddress: "14.97.108.226",
  //     serverMachineName: null,
  //     flightGuid: "cmVzdWx0MC40MjEwNDg2MDYwMTA5NTE5NQ==",
  //     totalPaxCount: 1,
  //     flexiblityqualifier: null,
  //     refundableFaresOnly: false,
  //     isDirectFlight: false,
  //     isFlexibalFlight: true,
  //     appServer: null,
  //     searchDate: "2023-04-18",
  //     UtmSource: null,
  //     UtmMedium: null
  //  };
  //   this.http
  //     .post('http://172.17.10.23:82/api/flight/SearchFlights', data)
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.apidata = response;
  //       // this.apidata = this.apidata.name;
  //       // console.log(this.apidata);
        
  //     });
  // }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);

        const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }
    });
    // this.postData();
    this.myForm = this.fb.group({
      tripchoice: [''],
      roundtrip: [''],
      oneway: [''],
      classbook: [''],
      departfrom: ['', Validators.required],
      whereto: ['', Validators.required],
      rounddate: ['', Validators.required],
      onedate: [''],
      trtotal: [1],
      startDate: null,
      endDate: null,
      travelerclass: this.fb.group({
        adults: [1],
        child: [0],
        infant: [0],
        tripclass: [''],
      }),
      tripselect: this.fb.group({
        roundtrip: [''],
        oneway: [''],
      }),
    });
    this.myForm.get('tripchoice').setValue('Round Trip');
    this.myForm.get('classbook').setValue('Economy');
    // if(this.myForm.get('trtotal').value>1){
    //   this.ttotal = this.myForm.get('trtotal').value;
    //   console.log(this.myForm.get('trtotal').value);

    // }
    // console.log(this.myForm.get('trtotal').value);

    this.myForm.get('trtotal').valueChanges.subscribe((value: any) => {
      this.ttotal = this.myForm.get('trtotal').value;
      // console.log(this.myForm.get('trtotal').value);
    });

    this.data = this.flightList;
    this.flightdata = this.flightList;

    this.myForm.get('travelerclass.tripclass').setValue('Economy');
    this.myForm
      .get('travelerclass.tripclass')
      .valueChanges.subscribe((value: any) => {
        this.myForm.get('travelerclass').get('tripclass').value = value;
        this.travelclass = this.myForm
          .get('travelerclass')
          .get('tripclass').value;
      });

    const savedData = localStorage.getItem('offerData');
    if (savedData) {
      this.myForm.setValue(JSON.parse(savedData));
    }

    this.myForm.controls['departfrom'].valueChanges.subscribe(
      (value: string | any[]) => {
        if (value.length == 2) this.departtext = true;
      }
    );
    this.minDate1 = this.minDate;
    this.date2ch = this.minDate;

    if (
      this.myForm.get('rounddate').value &&
      this.myForm.get('onedate').value
    ) {
      this.placeholderText = '';
      this.placeholderText2 = '';
    }

    // this.myForm.controls['rounddate'].valueChanges.subscribe(
    //   (value: any) => {
    //     this.myForm.get('rounddate').setValue(this.datefort);
    //     // console.log("grttt");
        
    //   }
    // );

    this.myForm.get('rounddate').valueChanges.subscribe((value: any) => {

        this.minDate1 = this.myForm.get('rounddate').value;
        this.daterr = value._d;
        // console.log(this.minDate1);
        // this.myForm.get('rounddate').setValue(dater);
        // console.log(this.myForm.get('rounddate').value);
        // if(this.daterr > this.dateoo){
          this.myForm.get('onedate').setValue('');
        // }
    });

    this.myForm.get('onedate').valueChanges.subscribe((value: any) => {
      this.dateoo = value._d;
        // this.myForm.get('onedate').setValue(dater);
        // console.log(this.myForm.get('onedate').value);
    });
    // console.log(this.minDate1);
    

    this.myForm.get('departfrom').valueChanges.subscribe((value: any) => {
      this.myForm.get('departfrom').value = value;
      // console.log(this.myForm.get('departfrom').value.length);
      
      
    if (this.myForm.get('departfrom').value.length > 6) {
      setTimeout(() => {
        const secondInput = this.el.nativeElement.querySelector('#secondInput');
        secondInput.focus();
        this.departcount++;
        // console.log("hreee");
      }, 100);
    }

    // console.log(this.departcount);

    });

    this.myForm.get('whereto').valueChanges.subscribe((value: any) => {
      this.myForm.get('whereto').value = value;
      // console.log(this.myForm.get('whereto').value);
      if (
        this.myForm.get('departfrom').value === this.myForm.get('whereto').value
      ) {
        this.matchvv = true;
        this.myForm.get('whereto').setValue('');
        setTimeout(() => {
          this.matchvv = false;
        }, 2000);
      }

          
    if (this.myForm.get('whereto').value.length > 6) {
      setTimeout(() => {
        // const secondInput = this.el.nativeElement.querySelector('#thirdInput');
        // secondInput.focus();
        // console.log("hreee");
        this.picker1.open()
      }, 100);
    }
    });

    // console.log("freeeshgfxdxf");
    // if (this.focuscond) {
    //   this.input2.nativeElement.focus();
    //   console.log('freeeshgfxdxf');
    // }
  }
  // focusSecondInput() {
  //   const secondInput = this.el.nativeElement.querySelector('#secondInput');
  //   secondInput.focus();
  //   console.log("hreee");
    
  // }
 

  openEndPicker(event: MatDatepickerInputEvent<Date> | any) {
    // this.myDate = event.value;
    //  this.formattedDate = this.datePipe?.transform(this.myDate, 'dd-MMM-yyyy');
    //  console.log(this.formattedDate);
    //  console.log(this.datefort);
    //  this.myForm.get('rounddate').setValue(this.formattedDate);
    //  console.log(this.myForm.get('rounddate').value._d.toDateString());
     
     
    // this.datefort = formattedDate;
    this.picker2.open();
    // return this.datePipe?.transform(this.myDate, 'dd-MMM-yyyy');
  }
  // opendialog1() {
  //   // picker2.open();
  //   this.picker2.open();
  // }

  // filterStates(name: string|any) {
  //   return this.flightList.filter(state =>
  //     state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  // }
  // filterStatesw(list: string|any) {
  //   return this.flightList2.filter(states =>
  //     states.name.toLowerCase().indexOf(list.toLowerCase()) === 0);
  // }
  totaltraveler() {
    this.ttotal =
      this.myForm.get('travelerclass').get('adults').value +
      this.myForm.get('travelerclass').get('child').value +
      this.myForm.get('travelerclass').get('infant').value;

    this.myForm.get('trtotal').setValue(this.ttotal);
  }

  classbook(value: string) {
    if (value == 'economy') {
      this.ecocheck = true;
      this.buscheck = false;
      this.fircheck = false;
      this.precheck = false;
    }
    if (value == 'business') {
      this.ecocheck = false;
      this.buscheck = true;
      this.fircheck = false;
      this.precheck = false;
    }
    if (value == 'first') {
      this.ecocheck = false;
      this.buscheck = false;
      this.fircheck = true;
      this.precheck = false;
    }
    if (value == 'premium') {
      this.ecocheck = false;
      this.buscheck = false;
      this.fircheck = false;
      this.precheck = true;
    }
  }

  adultadd() {
    if (this.ttotal == 9) {
      this.validationadd = 1;
      setTimeout(() => {
        this.validationadd = 0;
      }, 5000);
    }
    if (this.myForm.get('travelerclass').get('adults').value === 9) {
    } else {
      if (this.ttotal != 9) {
        const currentValue = this.myForm
          .get('travelerclass')
          .get('adults').value;
        this.myForm
          .get('travelerclass')
          .get('adults')
          .setValue(currentValue + 1);
        this.totaltraveler();
      }
    }
  }
  childadd() {
    if (this.ttotal == 9) {
      this.validationadd = 1;
      setTimeout(() => {
        this.validationadd = 0;
      }, 5000);
    }
    if (this.myForm.get('travelerclass').get('child').value === 9) {
    } else {
      if (this.ttotal != 9) {
        const currentValue = this.myForm
          .get('travelerclass')
          .get('child').value;
        this.myForm
          .get('travelerclass')
          .get('child')
          .setValue(currentValue + 1);
        this.totaltraveler();
      }
    }
  }
  infantadd() {
    if (this.ttotal == 9) {
      this.validationadd = 1;
      setTimeout(() => {
        this.validationadd = 0;
      }, 5000);
    }
    if (this.myForm.get('travelerclass').get('infant').value === 9) {
    } else {
      if (this.ttotal != 9) {
        const currentValue = this.myForm
          .get('travelerclass')
          .get('infant').value;
        this.myForm
          .get('travelerclass')
          .get('infant')
          .setValue(currentValue + 1);
        this.totaltraveler();
      }
    }
  }

  adultsub() {
    if (this.ttotal != 9) {
      this.validationadd = 0;
    }
    if (this.myForm.get('travelerclass').get('adults').value === 1) {
    } else {
      const currentValue = this.myForm.get('travelerclass').get('adults').value;
      this.myForm
        .get('travelerclass')
        .get('adults')
        .setValue(currentValue - 1);
      this.totaltraveler();
    }
  }
  childsub() {
    if (this.ttotal != 9) {
      this.validationadd = 0;
    }
    if (this.myForm.get('travelerclass').get('child').value === 0) {
    } else {
      const currentValue = this.myForm.get('travelerclass').get('child').value;
      this.myForm
        .get('travelerclass')
        .get('child')
        .setValue(currentValue - 1);
      this.totaltraveler();
    }
  }
  infantsub() {
    if (this.ttotal != 9) {
      this.validationadd = 0;
    }
    if (this.myForm.get('travelerclass').get('infant').value === 0) {
    } else {
      const currentValue = this.myForm.get('travelerclass').get('infant').value;
      this.myForm
        .get('travelerclass')
        .get('infant')
        .setValue(currentValue - 1);
      this.totaltraveler();
    }
  }

  sendEmail() {
    const emailData = { html: '<p>Hello, this is the HTML content of the email!</p>' }; // Replace with your HTML data
    // this.http.post('/api/send-email', emailData).subscribe(
    //   response => {
    //     console.log('Email sent successfully!', response);
    //   },
    //   error => {
    //     console.error('Failed to send email:', error);
    //   }
    // );
  }

  filterData(filterValue: string, value: any) {
    // console.log(this.departcount);
    
    
    if (this.myForm.value.departfrom.length >= 1) {
      this.filteredData = this.data
        .filter((item: any) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((item) => ({ name: item.name }));
    } else {
      this.filteredData = [];
    }

    // if(this.departcount == 1){
    //   this.input1.nativeElement.select();
    // }
  }

  filterDataw(filterValues: string) {
    if (this.myForm.value.whereto.length >= 1) {
      this.filteredData2 = this.flightdata.filter((item: any) =>
        item.name.toLowerCase().includes(filterValues.toLowerCase())
      );
      this.flightCode = this.flightdata.code;
    } else {
      this.filteredData2 = [];
    }
  }

  updatePlaceholderText() {
    this.placeholderText = '';
  }

  updatePlaceholderText2() {
    this.placeholderText2 = '';
  }

  // onDateChange() {
  //   const input = document.getElementById('datepickerInput') as HTMLInputElement;
  //   input.placeholder = '';
  //   console.log(input.placeholder);
  // }

  onDate1Selected(event: MatDatepickerInputEvent<Date>) {
    this.date1 = event.value;
  }

  onDate2Selected(event: MatDatepickerInputEvent<Date>) {
    this.date2 = event.value;
  }

  onSubmit() {
    localStorage.setItem('offerData', JSON.stringify(this.myForm.value));
    console.log(this.myForm.value);
    // this.router.navigateByUrl('/list');
  }



}
