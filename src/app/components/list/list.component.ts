import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
  ElementRef,
  QueryList,
  ViewChildren,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import airport from '../../json/airports.json';
import response from '../../json/response.json';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { PopUpComponent } from './pop-up/pop-up.component';
import { map, startWith } from 'rxjs/operators';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Popup } from 'src/app/shared/services/popup.service';
// import { MyDialogComponent } from './my-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../model/employee';
import { EmpFilter, filterOption } from '../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import * as $ from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Options } from '@angular-slider/ngx-slider';
import { HttpClient } from '@angular/common/http';
// import { DOCUMENT } from '@angular/common';
import { ViewportScroller } from '@angular/common';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-yyyy',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,
  ],
})
export class ListComponent implements OnInit, OnDestroy {
  // @ViewChild(DaterangepickerComponent)
  // private picker: DaterangepickerComponent|any;
  @ViewChildren('checkboxRef') checkboxes: QueryList<ElementRef> | any;

  value1: number | any;
  highValue1: number = 0;
  valuec1: number | any;
  highValuec1: number = 0;

  value2: number = 1440;
  highValue2: number = 0;
  valuec2: number = 1440;
  highValuec2: number = 0;

  value3: number  = 1440;
  highValue3: number = 0;
  valuec3: number = 1440;
  highValuec3: number = 0;

  options1: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number) => `$${value}`,
  };
  options2: Options = {
    // floor: 0,
    // ceil: 100,
    floor: 0,
    ceil: 1440,
    // step: 15,
    // translate: (value: number) => {
    //   if (value === 12) {
    //     return `12 PM`;
    //   } else if (value === 0) {
    //     return `12 AM`;
    //   } else if (value < 12) {
    //     return `${value} AM`;
    //   } else {
    //     return `${value - 12} PM`;
    //   }
    // },
    // translate: (value: number) => {
    //   const hours = Math.floor(value / 60).toString().padStart(2, '0');
    //   const minutes = (value % 60).toString().padStart(2, '0');
    //   return `${hours}:${minutes}`;
    // }
    translate: (value: number) => {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      const ampm = hours < 12 ? 'AM' : 'PM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
  };
  options3: Options = {
    floor: 0,
    ceil: 1440,
    translate: (value: number) => {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      const ampm = hours < 12 ? 'AM' : 'PM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
  };

  mark: boolean = false;

  count1: number = 0;
  count2: number = 0;
  // modalRef: BsModalRef|any;

  flightFilters: EmpFilter[] = [];

  defaultValue = 'All';

  filterDictionary = new Map<string, string>();

  selectedTabIndex: number = 0;

  ttotal: Number | any;
  travelclass: string = 'Economy';

  dialogRefr: MatDialogRef<PopUpComponent> | any;

  placeholderText = 'Depart';
  placeholderText2 = 'Return';

  tab1: boolean = true;
  tab2: boolean = false;

  myForm: FormGroup | any;
  filterForm: FormGroup | any;
  displayStyle = 'none';
  public daterange: any = {};

  date1: Date | any;
  date2: Date | any;

  minDate = new Date();
  minDate1: Date | any;

  switchdepart:any;
  switchwhere:any;

  tripselected: any;
  departtext: string | any;
  wheretext: string | any;
  adults: Number | any;
  child: Number | any;
  infant: Number | any;

  @ViewChild('picker2') picker2: MatDatepicker<Date> | any;
  @ViewChild('picker1') picker1: MatDatepicker<Date> | any;

  currentDate: Date = new Date();
  data: any | any[];
  flightdata: any | any[];
  filteredData: any | any[];
  filteredData2: any | any[];
  flightList: { name: String; code: String }[] = airport;
  flightList2: { name: String; code: String }[] = airport;
  response: any = response;
  matchvv: boolean = false;
  listresponse: any[] | any;

  validationadd: number = 0;

  departlist: any;
  returnlist: any;
  airlinelist: any;

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  data2: any;
  date2ch: any;

  listdata: any[] = [];
  mainListdata: any[] = [];
  cheapdata: any[] = [];
  shortestdata: any[] = [];
  distinctdata: any[] = [];
  nontabs: boolean | any;
  onetabs: boolean | any;
  twotabs: boolean | any;

  adistinctData: any;
  adistinctLength: any;
  rdistinctData: any;
  rdistinctLength: any;
  ardistinctData: any;
  ardistinctLength: any;

  combineValues: any = [];
  departValues: any = [];
  returnValues: any = [];
  airlineValues: any = [];

  checkedIndices = [];

  maxprice: any = 0;
  departtime: any = 0;
  returntime: any = 0;

  depItems: any[] = [];
  retItems: any[] = [];
  airItems: any[] = [];
  combinearr: any = [];
  deparr: any = [];
  retarr: any = [];
  airarr: any = [];

  loadingi:boolean=true;

  // @ViewChild('checkboxes') checkboxes: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 8,
      },
    },
    nav: false,
  };
  parsedData: any;
  apidata: any;

  datas: any = {
    message: 'Hello from parent component!',
  };
  count: number = 11;
  // @Inject(DOCUMENT) private document: Document|any;
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private dialogRef: MatDialog,
    private router: Router,
    private http: HttpClient,
    private popup: Popup, // private modalService: BsModalService,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  getData() {
    this.http.get('http://localhost:5000/profiles').subscribe((data) => {
      console.log(data);
      // this.apidata = data;
    });
  }
  // https://api.gotoflyer.com/api/flight/SearchFlights
  // http://localhost:5000/profiles
  // postData() {
  //   const data = { name: 'jjjj Doe', age: 10, sex:'male', human:'Not human' };
  //   this.http
  //     .post('https://api.gotoflyer.com/api/flight/SearchFlights', data)
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.apidata = response;
  //       this.apidata = this.apidata.name;
  //       console.log(this.apidata);
  //     });
  // }

  openDialog(value: any[]) {
    this.dialogRefr = this.dialogRef.open(PopUpComponent, {
      data: value,
    });
    this.popup.setDialogRef(this.dialogRefr);
  }

  // openModal(template: TemplateRef<any>){
  //   this.modalRef = this.modalService.show(template)
  // }
  ecocheck: boolean | any;
  buscheck: boolean | any;
  fircheck: boolean | any;
  precheck: boolean | any;

  cheapprice: number = Number.MAX_SAFE_INTEGER;
  short: number = Number.MAX_SAFE_INTEGER;
  shorttime: any;
  listlen: number | any;
  checknum: number | any;

  showLoader = true;

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
        console.log("rrrrr");
        const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }
    });

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     // Scroll to top of page
    //     // this.document.body.scrollTop = 0;
    //     // this.document.documentElement.scrollTop = 0;
        
        
    //   }
    // });

   this.loading('false');
    this.listdata = this.mainListdata = this.response[0].Results;

    for (let i = 0; i < this.listdata.length; i++) {
      if (this.listdata[i].TotalFare > this.maxprice) {
        this.maxprice = this.listdata[i].TotalFare;
      }
      if (this.listdata[i].TotalFare < this.cheapprice) {
        this.cheapprice = this.listdata[i].TotalFare;
      }
    }
    for (let i = 0; i < this.listdata.length; i++) {
      if (this.listdata[i].CompleteTimeDuration < this.short) {
        this.short = this.listdata[i].CompleteTimeDuration;
      }
      const hoursAndMinutes = this.convertMinutesToHoursAndMinutes(this.short);
      this.shorttime = hoursAndMinutes;
      // console.log(hoursAndMinutes);
    }
    this.value1 = this.maxprice;
    this.valuec1 = this.maxprice;
    this.options1.ceil = this.maxprice;
    this.highValue1 = this.cheapprice;
    this.highValuec1 = this.cheapprice;
    this.options1.floor = this.cheapprice;

    for (let i = 0; i < this.listdata.length; i++) {
      if (
        this.listdata[i].FlightSegmentDetails.OutBoundSegment[0].Departuremin >
        this.departtime
      )
        this.departtime =
          this.listdata[i].FlightSegmentDetails.OutBoundSegment[0].Departuremin;
    }
    // this.value2 = this.departtime;
    // this.valuec2 = this.departtime;
    // this.options2.ceil = this.departtime;

    for (let i = 0; i < this.listdata.length; i++) {
      if (
        this.listdata[i].FlightSegmentDetails.InBoundSegment[0].Departuremin >
        this.returntime
      )
        this.returntime =
          this.listdata[i].FlightSegmentDetails.InBoundSegment[0].Departuremin;
    }
    // this.value3 = this.returntime;
    // this.valuec3 = this.returntime;
    // this.options3.ceil = this.returntime;

    if (this.tab1) {
      this.cheapdata = this.mainListdata.sort(
        (low, high) => low.TotalFare - high.TotalFare
      );
      this.listdata = this.cheapdata;
    }
    this.listlen = this.listdata.length;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.popup.dialogRef) {
          const data = this.myForm;
          this.popup.closeDialog();
        }
      }
    });

    this.adistinctData = [...new Set(this.listdata.map((item) => item.Origin))];
    this.adistinctLength = this.adistinctData.length;
    this.rdistinctData = [
      ...new Set(this.listdata.map((item) => item.Destination)),
    ];
    this.rdistinctLength = this.rdistinctData.length;
    this.ardistinctData = [
      ...new Set(
        this.listdata.map((item) => item.ValidatingCarrier.AirlineName)
      ),
    ];
    this.ardistinctLength = this.ardistinctData.length;

    this.myForm = this.fb.group({
      tripchoice: [''],
      classbook: [''],
      departfrom: ['', Validators.required],
      whereto: ['', Validators.required],
      rounddate: ['', Validators.required],
      onedate: ['', Validators.required],
      startDate: null,
      endDate: null,
      tripselect: this.fb.group({
        roundtrip: [''],
        oneway: [''],
      }),
      travelerclass: this.fb.group({
        adults: [1],
        child: [0],
        infant: [0],
        tripclass: [''],
      }),
      roundtrip: [''],
      oneway: [''],
      trtotal: [''],
    });

    const savedData: any = localStorage.getItem('formData');
    if (savedData) {
      this.myForm.setValue(JSON.parse(savedData));
    }
    this.parsedData = JSON.parse(savedData);
    // this.filterForm = this.fb.group({
    //   Airports: ['', Validators.required],
    //   Stops: ['', Validators.required],
    // });
    // console.log(this.parsedData);
    console.log(this.parsedData);

    this.tripselected = this.parsedData.tripchoice;
    this.myForm.patchValue(this.parsedData);
    this.data2 = this.myForm.value;
    // console.log(this.myForm.value);
    // console.log(this.parsedData.travelerclass.tripclass);
    if (this.parsedData.travelerclass.tripclass == 'Economy') {
      this.ecocheck = true;
    } else if (this.parsedData.travelerclass.tripclass == 'Business Class') {
      this.buscheck = true;
    } else if (this.parsedData.travelerclass.tripclass == 'First Class') {
      this.fircheck = true;
    } else if (this.parsedData.travelerclass.tripclass == 'Premium Economy') {
      this.precheck = true;
    }

    this.switchdepart = this.parsedData.departfrom;
    this.switchwhere = this.parsedData.whereto;

    this.myForm.get('departfrom').valueChanges.subscribe((value: any) => {
      this.myForm.get('departfrom').value = value;
      this.switchdepart = value;
    });
    
    this.myForm.get('whereto').valueChanges.subscribe((value: any) => {
      this.myForm.get('whereto').value = value;
      this.switchwhere = value;
      if (
        this.switchdepart === this.switchwhere
      ) {
        this.matchvv = true;
        this.myForm.get('whereto').setValue('');
        setTimeout(() => {
          this.matchvv = false;
        }, 2000);
      }
    });

    this.data = this.flightList;
    this.flightdata = this.flightList;
    // this.filteredData = this.flightList;

    // this.minDate = this.parsedData.rounddate;
    this.minDate1 = this.parsedData.rounddate;
    this.date2ch = this.minDate;
    // console.log(this.minDate);
    // console.log(this.minDate1);

    this.myForm.get('rounddate').valueChanges.subscribe((value: any) => {
      if (value) {
        // this.myForm.get('rounddate').value = value;
        this.minDate1 = this.myForm.get('rounddate').value;
      }
      // console.log(this.myForm.get('rounddate').value.getDate());
      const date1 = this.myForm.get('rounddate').value;
      const date2 = this.date2ch;
      // if (date1 > date2) {
      this.myForm.get('onedate').setValue('');
      // }
    });

    this.myForm.get('onedate').valueChanges.subscribe((value: any) => {
      if (this.myForm.get('onedate').value) {
        // this.myForm.get('onedate').value = value;
        // console.log(this.myForm.get('onedate').value.getDate());
        this.date2ch = this.myForm.get('onedate').value;
      }
    });

    if (this.parsedData != null) {
      this.myForm
        .get('travelerclass.tripclass')
        .setValue(this.parsedData.travelerclass.tripclass);
    }
    this.ttotal =
      this.parsedData.travelerclass.adults +
      this.parsedData.travelerclass.child +
      this.parsedData.travelerclass.infant;
    this.travelclass = this.parsedData.travelerclass.tripclass;

    this.myForm
      .get('travelerclass.tripclass')
      .valueChanges.subscribe((value: any) => {
        this.myForm.get('travelerclass').get('tripclass').value = value;
        this.travelclass = this.myForm
          .get('travelerclass')
          .get('tripclass').value;
      });

    this.myForm.get('rounddate').valueChanges.subscribe((value: any) => {
      this.myForm.get('rounddate').value = value;
      this.minDate1 = this.myForm.get('rounddate').value;
    });

    // if(this.listdata.length)

    // this.maxprice =
  }

  loading(value:any){
    if(value == 'true'){
      this.loadingi = true;
    }
    setTimeout(() => {
      this.loadingi = false;
    }, 2000);
  }

  // findNonAdults(people: any[]) {
  //   let check = false;
  //   let data = people.filter((value, index, self) => {
  //     return (check =
  //       self.map((x) => x.Origin).indexOf(value.Origin) === index);
  //   });
  //   console.log(data);
  //   data.forEach((obj) => {
  //     // this.mainListdata = obj;
  //     console.log(obj);
  //   });
  // }

  // combine(event: any, value: any){
  //   if (event.target.checked) {
  //     // combineValues
  //     this.combineValues.push(value);
  //     console.log(this.combineValues);

  //     this.combinearr = [];
  //     for (let i = 0; i < this.combineValues.length; i++) {
  //       this.combinearr.push(this.combineValues[i]);
  //     }
  //     console.log(this.combinearr);

  //     this.cheapdata = this.mainListdata.filter((o: any) =>
  //     this.combinearr.includes(o.Destination)
  //   );
  //   this.listdata = this.cheapdata;

  //   }else{
  //     this.combineValues = this.combineValues.filter(
  //       (option: any) => option !== value
  //     );
  //     console.log(this.combineValues);
  //     this.combinearr = [];
  //     for (let i = 0; i < this.combineValues.length; i++) {
  //       this.combinearr.push(this.combineValues[i]);
  //     }
  //     console.log(this.combinearr);
  //     this.cheapdata = this.mainListdata.filter((o: any) =>
  //     this.combinearr.includes(o.Destination)
  //   );
  //   this.listdata = this.cheapdata;

  //   }

  // }

  switch(){
    console.log(this.switchdepart); 
    console.log(this.switchwhere);
    const temp = this.switchdepart;
    const tempp = this.switchwhere;
    this.myForm.get('departfrom').setValue(tempp);
    this.myForm.get('whereto').setValue(temp);
    console.log(this.myForm.get('departfrom').value);
    console.log(this.myForm.get('whereto').value);
    
  }

  convertMinutesToHoursAndMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60); // Calculate hours by dividing minutes by 60
    const remainingMinutes = minutes % 60; // Calculate remaining minutes by getting the remainder when divided by 60
    const hoursString = hours < 10 ? '0' + hours : hours.toString(); // Convert hours to string and add leading zero if necessary
    const minutesString =
      remainingMinutes < 10
        ? '0' + remainingMinutes
        : remainingMinutes.toString(); // Convert remaining minutes to string and add leading zero if necessary
    return hoursString + 'h ' + minutesString + 'm'; // Return the hours and minutes as a formatted string
  }

  // Top Tabs Filter
  cheapTab() {
    this.cheapdata = this.mainListdata.sort(
      (low, high) => low.TotalFare - high.TotalFare
    );
    this.listdata = this.cheapdata;
  }
  shorttab() {
    this.shortestdata = this.mainListdata.sort(
      (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
    );
    this.listdata = this.shortestdata;
  }

  // First Filter
  nontab(event: any) {
    if (event.target.checked) {
      this.nontabs = true;
      if (this.tab1 || (this.nontabs && this.onetabs)) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.shortestdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.listdata = this.shortestdata;
      }
      if (this.nontabs && this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
        );
        this.listdata = this.cheapdata;
      } else if (this.nontabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.nontabs && this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 0);
        this.listdata = this.cheapdata;
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 0);
        this.listdata = this.cheapdata;
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 0);
        this.listdata = this.cheapdata;
      }
    } else {
      this.nontabs = false;
      if (this.tab1) {
        this.cheapdata = this.mainListdata.sort(
          (low, high) => low.TotalFare - high.TotalFare
        );
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.mainListdata.sort(
          (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
        );
        this.listdata = this.shortestdata;
      }
      if (this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1
        );
        this.listdata = this.cheapdata;
      } else if (this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
      }
    }
  }
  onetab(event: any) {
    if (event.target.checked) {
      this.onetabs = true;
      if (this.tab1) {
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 1);
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.shortestdata.filter(
          (o: any) => o.NoOfStops === 1
        );
        this.listdata = this.shortestdata;
      }
      if (this.onetabs && this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
        );
        this.listdata = this.cheapdata;
      } else if (this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.nontabs && this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 1);
        this.listdata = this.cheapdata;
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 1);
        this.listdata = this.cheapdata;
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 1);
        this.listdata = this.cheapdata;
      }
    } else {
      this.onetabs = false;
      if (this.tab1) {
        this.cheapdata = this.mainListdata.sort(
          (low, high) => low.TotalFare - high.TotalFare
        );
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.mainListdata.sort(
          (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
        );
        this.listdata = this.shortestdata;
      }
      if (this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.listdata = this.cheapdata;
      } else if (this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.nontabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
      }
    }
  }
  twotab(event: any) {
    if (event.target.checked) {
      this.twotabs = true;
      if (this.tab1) {
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 2);
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.shortestdata.filter(
          (o: any) => o.NoOfStops === 2
        );
        this.listdata = this.shortestdata;
      }
      if (this.twotabs && this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      } else if (this.twotabs && this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.nontabs && this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 2);
        this.listdata = this.cheapdata;
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 2);
        this.listdata = this.cheapdata;
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
        this.cheapdata = this.cheapdata.filter((o: any) => o.NoOfStops === 2);
        this.listdata = this.cheapdata;
      }
    } else {
      this.twotabs = false;
      if (this.tab1) {
        this.cheapdata = this.mainListdata.sort(
          (low, high) => low.TotalFare - high.TotalFare
        );
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.mainListdata.sort(
          (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
        );
        this.listdata = this.shortestdata;
      }
      if (this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.listdata = this.cheapdata;
      } else if (this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1
        );
        this.listdata = this.cheapdata;
      }
      if (this.nontabs && this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
      }
    }
  }

  // Second Filter
  pricesl(value: any, highvalue: any) {
    this.valuec1 = value;
    this.highValuec1 = highvalue;
    if (this.tab1) {
      this.cheapdata = this.mainListdata.sort(
        (low, high) => low.TotalFare - high.TotalFare
      );
      this.cheapdata = this.cheapdata.filter(
        (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
      );
      this.listdata = this.cheapdata;
    } else if (this.tab2) {
      this.shortestdata = this.mainListdata.sort(
        (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
      );
      this.shortestdata = this.shortestdata.filter(
        (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
      );
      this.listdata = this.shortestdata;
    }
    if (this.nontabs || this.onetabs || this.twotabs) {
      if (this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      } else if (this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      } else if (this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      }

      if (this.nontabs && this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      } else if (this.nontabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      } else if (this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      }
      if (this.nontabs && this.onetabs && this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
      }

      // this.departtime
      // this.returntime
      // this.maxprice

      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        // this.departl(this.valuec2, this.highValuec2);
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >=
              this.valuec2 &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <=
              this.highValuec2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
        // console.log("grttt");
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        // this.returnl(this.valuec3, this.highValuec3);
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >=
              this.valuec3 &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <=
              this.highValuec3
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) => o.TotalFare >= value && o.TotalFare <= highvalue
        );
        this.listdata = this.cheapdata;
        // console.log("grttt");
      }
    }
    // if(this.valuec1<10000 && this.highValuec1>0){
    //   this.pricesl(this.valuec1,this.highValuec1 );
    // }
    // if(this.valuec2<100 && this.highValuec2>0){
    //   this.departl(this.valuec2,this.highValuec2 );
    // }
    // if(this.valuec3<100 && this.highValuec3>0){
    //   this.returnl(this.valuec3,this.highValuec3 );
    // }
  }
  departl(value: any, highvalue: any) {
    this.valuec2 = value;
    this.highValuec2 = highvalue;
    if (this.tab1) {
      this.cheapdata = this.mainListdata.sort(
        (low, high) => low.TotalFare - high.TotalFare
      );
      this.cheapdata = this.cheapdata.filter(
        (o: any) =>
          o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
          o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
      );
      this.listdata = this.cheapdata;
    } else if (this.tab2) {
      this.shortestdata = this.mainListdata.sort(
        (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
      );
      this.shortestdata = this.shortestdata.filter(
        (o: any) =>
          o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
          o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
      );
      this.listdata = this.shortestdata;
    }
    if (this.nontabs || this.onetabs || this.twotabs) {
      if (this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
        this.listdata = this.cheapdata;
      } else if (this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
        this.listdata = this.cheapdata;
      } else if (this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      }

      // console.log(this.departtime);
      // console.log(this.returntime);

      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        // this.pricesl(this.valuec1, this.highValuec1);
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.TotalFare >= this.valuec1 && o.TotalFare <= this.highValuec1
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        // this.returnl(this.valuec3, this.highValuec3);
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >=
              this.valuec3 &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <=
              this.highValuec3
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      }
    }
    // if(this.valuec1<10000 && this.highValuec1>0){
    //   this.pricesl(this.valuec1,this.highValuec1 );
    // }
    // if(this.valuec2<100 && this.highValuec2>0){
    //   this.departl(this.valuec2,this.highValuec2 );
    // }
    // if(this.valuec3<100 && this.highValuec3>0){
    //   this.returnl(this.valuec3,this.highValuec3 );
    // }
  }
  returnl(value: any, highvalue: any) {
    this.valuec3 = value;
    this.highValuec3 = highvalue;
    if (this.tab1) {
      this.cheapdata = this.mainListdata.sort(
        (low, high) => low.TotalFare - high.TotalFare
      );
      this.cheapdata = this.cheapdata.filter(
        (o: any) =>
          o.FlightSegmentDetails.InBoundSegment[0].Departuremin >= value &&
          o.FlightSegmentDetails.InBoundSegment[0].Departuremin <= highvalue
      );
      this.listdata = this.cheapdata;
    } else if (this.tab2) {
      this.shortestdata = this.mainListdata.sort(
        (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
      );
      this.shortestdata = this.shortestdata.filter(
        (o: any) =>
          o.FlightSegmentDetails.OutBoundSegment.Departuremin >= value &&
          o.FlightSegmentDetails.OutBoundSegment.Departuremin <= highvalue
      );
      this.listdata = this.shortestdata;
    }
    if (this.nontabs || this.onetabs || this.twotabs) {
      if (this.nontabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 0
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      } else if (this.onetabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 1
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      } else if (this.twotabs) {
        this.cheapdata = this.mainListdata.filter(
          (o: any) => o.NoOfStops === 2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        // this.pricesl(this.valuec1, this.highValuec1);
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.TotalFare >= this.valuec1 && o.TotalFare <= this.highValuec1
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        // this.departl(this.valuec2, this.highValuec2);
        this.cheapdata = this.mainListdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin >=
              this.valuec2 &&
            o.FlightSegmentDetails.OutBoundSegment[0].Departuremin <=
              this.highValuec2
        );
        this.cheapdata = this.cheapdata.filter(
          (o: any) =>
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin >= value &&
            o.FlightSegmentDetails.InBoundSegment[0].Departuremin <= highvalue
        );
        this.listdata = this.cheapdata;
      }
    }

    // if(this.valuec1<10000 && this.highValuec1>0){
    //   this.pricesl(this.valuec1,this.highValuec1 );
    // }
    // if(this.valuec2<100 && this.highValuec2>0){
    //   this.departl(this.valuec2,this.highValuec2 );
    // }
    // if(this.valuec3<100 && this.highValuec3>0){
    //   this.returnl(this.valuec3,this.highValuec3 );
    // }
  }

  // Third Filter
  departli(event: any, value: any) {
    this.departlist = event.target.value;
    if (event.target.checked) {
      this.departValues.push(value);
      this.deparr = [];
      for (let i = 0; i < this.departValues.length; i++) {
        this.deparr.push(this.departValues[i]);
      }
      if (this.tab1) {
        this.cheapdata = this.mainListdata.filter((o: any) =>
          this.deparr.includes(o.Origin)
        );
        this.listdata = this.cheapdata;
        if (this.nontabs || this.onetabs || this.twotabs) {
          if (this.nontabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 0
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.onetabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 1
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          }

          if (this.nontabs && this.onetabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.nontabs && this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.onetabs && this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          }

          if (this.nontabs && this.onetabs && this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) =>
                o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          }
        }

        if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
          this.pricesl(this.valuec1, this.highValuec1);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
          this.departl(this.valuec2, this.highValuec2);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
          this.returnl(this.valuec3, this.highValuec3);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
      } else if (this.tab2) {
        this.shortestdata = this.mainListdata.filter((o: any) =>
          this.deparr.includes(o.Origin)
        );
        this.listdata = this.shortestdata;
        if (this.nontabs || this.onetabs || this.twotabs) {
          if (this.nontabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 0
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.onetabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 1
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          }

          if (this.nontabs && this.onetabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.nontabs && this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          } else if (this.onetabs && this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          }

          if (this.nontabs && this.onetabs && this.twotabs) {
            this.cheapdata = this.mainListdata.filter(
              (o: any) =>
                o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
            );
            this.cheapdata = this.cheapdata.filter((o: any) =>
              this.deparr.includes(o.Origin)
            );
            this.listdata = this.cheapdata;
          }
        }

        if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
          this.pricesl(this.valuec1, this.highValuec1);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
          this.departl(this.valuec2, this.highValuec2);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
          this.returnl(this.valuec3, this.highValuec3);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
      }
    } else {
      this.departValues = this.departValues.filter(
        (option: any) => option !== value
      );
      this.deparr = [];
      for (let i = 0; i < this.departValues.length; i++) {
        this.deparr.push(this.departValues[i]);
      }
      if (this.tab1) {
        if (this.departValues.length != 0) {
          this.cheapdata = this.mainListdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        } else {
          this.cheapdata = this.mainListdata.sort(
            (low, high) => low.TotalFare - high.TotalFare
          );
          this.listdata = this.cheapdata;
        }
      } else if (this.tab2) {
        if (this.departValues.length != 0) {
          this.cheapdata = this.mainListdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        } else {
          this.shortestdata = this.mainListdata.sort(
            (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
          );
          this.listdata = this.shortestdata;
        }
      }
      if (this.nontabs || this.onetabs || this.twotabs) {
        if (this.nontabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1
          );
          this.listdata = this.cheapdata;
        } else if (this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 2
          );
          this.listdata = this.cheapdata;
        }
      }

      if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
        this.pricesl(this.valuec1, this.highValuec1);
        this.cheapdata = this.cheapdata.filter((o: any) =>
          this.deparr.includes(o.Origin)
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
        this.departl(this.valuec2, this.highValuec2);
        this.cheapdata = this.cheapdata.filter((o: any) =>
          this.deparr.includes(o.Origin)
        );
        this.listdata = this.cheapdata;
      }
      if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
        this.returnl(this.valuec3, this.highValuec3);
        this.cheapdata = this.cheapdata.filter((o: any) =>
          this.deparr.includes(o.Origin)
        );
        this.listdata = this.cheapdata;
      }
    }
  }
  returnli(event: any, value: any) {
    // this.returnlist = event.target.value;
    if (event.target.checked) {
      this.returnValues.push(value);
      // console.log(this.returnValues);

      this.retarr = [];
      for (let i = 0; i < this.returnValues.length; i++) {
        this.retarr.push(this.returnValues[i]);
      }
      // console.log(this.retarr);

      if (this.tab1) {
        this.cheapdata = this.mainListdata.filter((o: any) =>
          this.retarr.includes(o.Destination)
        );
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.mainListdata.filter((o: any) =>
          this.retarr.includes(o.Destination)
        );
        this.listdata = this.shortestdata;
      }

      if (this.nontabs || this.onetabs || this.twotabs) {
        if (this.nontabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        } else if (this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        }

        if (this.nontabs && this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        } else if (this.nontabs && this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs && this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        }

        if (this.nontabs && this.onetabs && this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) =>
              o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        }

        if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
          this.pricesl(this.valuec1, this.highValuec1);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
          this.departl(this.valuec2, this.highValuec2);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
          this.returnl(this.valuec3, this.highValuec3);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
      }
    } else {
      // this.returnValues = this.mainListdata.filter(
      //   (data, index) => this.retItems[index]
      // );
      // console.log(this.returnValues);
      this.returnValues = this.returnValues.filter(
        (option: any) => option !== value
      );
      // console.log(this.returnValues);
      this.retarr = [];
      for (let i = 0; i < this.returnValues.length; i++) {
        this.retarr.push(this.returnValues[i]);
      }
      // console.log(this.retarr);
      if (this.tab1) {
        if (this.returnValues.length != 0) {
          this.cheapdata = this.mainListdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        } else {
          this.cheapdata = this.mainListdata.sort(
            (low, high) => low.TotalFare - high.TotalFare
          );
          this.listdata = this.cheapdata;
        }
      } else if (this.tab2) {
        if (this.returnValues.length != 0) {
          this.shortestdata = this.mainListdata.filter((o: any) =>
            this.retarr.includes(o.Destination)
          );
          this.listdata = this.shortestdata;
        } else {
          this.shortestdata = this.mainListdata.sort(
            (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
          );
          this.listdata = this.shortestdata;
        }
      }

      if (this.nontabs || this.onetabs || this.twotabs) {
        if (this.nontabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1
          );
          this.listdata = this.cheapdata;
        } else if (this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 2
          );
          this.listdata = this.cheapdata;
        }

        if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
          this.pricesl(this.valuec1, this.highValuec1);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
          this.departl(this.valuec2, this.highValuec2);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
          this.returnl(this.valuec3, this.highValuec3);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
      }
    }
  }
  airlineli(event: any, value: any) {
    // this.airlinelist = event.target.value;
    if (event.target.checked) {
      this.airlineValues.push(value);
      // this.airlineValues = this.mainListdata.filter(
      //   (data, index) => this.airItems[index]
      // );

      this.airarr = [];
      for (let i = 0; i < this.airlineValues.length; i++) {
        this.airarr.push(this.airlineValues[i]);
      }

      if (this.tab1) {
        this.cheapdata = this.mainListdata.filter((o: any) =>
          this.airarr.includes(o.ValidatingCarrier.AirlineName)
        );
        this.listdata = this.cheapdata;
      } else if (this.tab2) {
        this.shortestdata = this.mainListdata.filter((o: any) =>
          this.airarr.includes(o.ValidatingCarrier.AirlineName)
        );
        this.listdata = this.shortestdata;
      }

      if (this.nontabs || this.onetabs || this.twotabs) {
        if (this.nontabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.ValidatingCarrier.AirlineName)
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.ValidatingCarrier.AirlineName)
          );
          this.listdata = this.cheapdata;
        } else if (this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.ValidatingCarrier.AirlineName)
          );
          this.listdata = this.cheapdata;
        }

        if (this.nontabs && this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0 || o.NoOfStops === 1
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.ValidatingCarrier.AirlineName)
          );
          this.listdata = this.cheapdata;
        } else if (this.nontabs && this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0 || o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs && this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1 || o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        }

        if (this.nontabs && this.onetabs && this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) =>
              o.NoOfStops === 0 || o.NoOfStops === 1 || o.NoOfStops === 2
          );
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.airarr.includes(o.Destination)
          );
          this.listdata = this.cheapdata;
        }

        if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
          this.pricesl(this.valuec1, this.highValuec1);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
          this.departl(this.valuec2, this.highValuec2);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
          this.returnl(this.valuec3, this.highValuec3);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
      }
    } else {
      this.airlineValues = this.airlineValues.filter(
        (option: any) => option !== value
      );
      // this.airlineValues = this.mainListdata.filter(
      //   (data, index) => this.airItems[index]
      // );

      this.airarr = [];
      for (let i = 0; i < this.airlineValues.length; i++) {
        this.airarr.push(this.airlineValues[i]);
      }

      if (this.tab1) {
        if (this.airlineValues.length != 0) {
          this.cheapdata = this.mainListdata.filter((o: any) =>
            this.airarr.includes(o.ValidatingCarrier.AirlineName)
          );
          this.listdata = this.cheapdata;
        } else {
          this.cheapdata = this.mainListdata.sort(
            (low, high) => low.TotalFare - high.TotalFare
          );
          this.listdata = this.cheapdata;
        }
      } else if (this.tab2) {
        if (this.airlineValues.length != 0) {
          this.shortestdata = this.mainListdata.filter((o: any) =>
            this.airarr.includes(o.ValidatingCarrier.AirlineName)
          );
          this.listdata = this.shortestdata;
        } else {
          this.shortestdata = this.mainListdata.sort(
            (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
          );
          this.listdata = this.shortestdata;
        }
      }

      if (this.nontabs || this.onetabs || this.twotabs) {
        if (this.nontabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 0
          );
          this.listdata = this.cheapdata;
        } else if (this.onetabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 1
          );
          this.listdata = this.cheapdata;
        } else if (this.twotabs) {
          this.cheapdata = this.mainListdata.filter(
            (o: any) => o.NoOfStops === 2
          );
          this.listdata = this.cheapdata;
        }

        if (this.valuec1 < this.maxprice && this.highValuec1 > 0) {
          this.pricesl(this.valuec1, this.highValuec1);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec2 < this.departtime && this.highValuec2 > 0) {
          this.departl(this.valuec2, this.highValuec2);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
        if (this.valuec3 < this.returntime && this.highValuec3 > 0) {
          this.returnl(this.valuec3, this.highValuec3);
          this.cheapdata = this.cheapdata.filter((o: any) =>
            this.deparr.includes(o.Origin)
          );
          this.listdata = this.cheapdata;
        }
      }
    }
  }

  //  combine(event: any){
  //     if (event.target.checked) {
  //       // combineValues
  //       this.combineValues.push(event.target.value);
  //       console.log(this.combineValues);

  //       this.combinearr = [];
  //       for (let i = 0; i < this.combineValues.length; i++) {
  //         this.combinearr.push(this.combineValues[i]);
  //       }
  //       console.log(this.combinearr);

  //       this.cheapdata = this.mainListdata.filter((o: any) =>
  //       this.combinearr.includes(o.Destination)
  //     );
  //     this.listdata = this.cheapdata;

  //     }else{
  //       this.combineValues = this.combineValues.filter(
  //         (option: any) => option !== event.target.value
  //       );
  //       console.log(this.combineValues);
  //       this.combinearr = [];
  //       for (let i = 0; i < this.combineValues.length; i++) {
  //         this.combinearr.push(this.combineValues[i]);
  //       }
  //       console.log(this.combinearr);
  //       this.cheapdata = this.mainListdata.filter((o: any) =>
  //       this.combinearr.includes(o.Destination)
  //     );
  //     this.listdata = this.cheapdata;

  //     }

  //   }

  tabchange(value: any) {
    this.checkboxes.forEach((checkbox: any) => {
      checkbox.nativeElement.checked = false;
      if (value == 'tab1') {
        this.nontabs = false;
        this.onetabs = false;
        this.twotabs = false;
        this.value1 = this.maxprice;
        this.highValue1 = this.cheapprice;
        this.value2 = 1440;
        this.highValue2 = 0;
        this.value3 = 1440;
        this.highValue3 = 0;
        for (let i = 0; i < this.departValues.length; i++) {
          this.depItems[i] = false;
        }
        for (let i = 0; i < this.returnValues.length; i++) {
          this.retItems[i] = false;
        }
        for (let i = 0; i < this.airlineValues.length; i++) {
          this.airItems[i] = false;
        }
        this.cheapdata = this.mainListdata.sort(
          (low, high) => low.TotalFare - high.TotalFare
        );
        this.departValues = [];
        this.returnValues = [];
        this.airlineValues = [];
      }
      if (value == 'tab2') {
        this.nontabs = false;
        this.onetabs = false;
        this.twotabs = false;
        this.value1 = this.maxprice;
        this.highValue1 = this.cheapprice;
        this.value2 = 1440;
        this.highValue2 = 0;
        this.value3 = 1440;
        this.highValue3 = 0;
        for (let i = 0; i < this.departValues.length; i++) {
          this.depItems[i] = false;
        }
        for (let i = 0; i < this.returnValues.length; i++) {
          this.retItems[i] = false;
        }
        for (let i = 0; i < this.airlineValues.length; i++) {
          this.airItems[i] = false;
        }
        this.shortestdata = this.mainListdata.sort(
          (low, high) => low.CompleteTimeDuration - high.CompleteTimeDuration
        );
        this.departValues = [];
        this.returnValues = [];
        this.airlineValues = [];
      }
    });
    if (value == 'tab1') {
      this.tab1 = true;
      this.tab2 = false;
      this.cheapTab();
      this.mark = true;
    }
    if (value == 'tab2') {
      this.tab1 = false;
      this.tab2 = true;
      this.shorttab();
      this.mark = true;
    }
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

  openEndPicker() {
    this.picker2.open();
  }

  tripchange(value: string) {
    this.myForm.get('tripchoice').setValue('Round Trip');
    // console.log(this.myForm.get('tripchoice').value);
  }
  tripchange2(value: string) {
    this.myForm.get('tripchoice').setValue('One Way');
    // console.log(this.myForm.get('tripchoice').value);
  }

  filterStates(name: string | any) {
    return this.flightList.filter(
      (state) => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  filterStatesw(list: string | any) {
    return this.flightList2.filter(
      (states) => states.name.toLowerCase().indexOf(list.toLowerCase()) === 0
    );
  }

  totaltraveler() {
    this.ttotal =
      this.myForm.get('travelerclass').get('adults').value +
      this.myForm.get('travelerclass').get('child').value +
      this.myForm.get('travelerclass').get('infant').value;

    this.myForm.get('trtotal').setValue(this.ttotal);
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

  // filterData(filterValue: string) {
  //   this.filteredData = this.data.filter((item: any) =>
  //     item.name.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  // }

  filterData(filterValue: string) {
    if (this.myForm.value.departfrom.length >= 1) {
      this.filteredData = this.data.filter((item: any) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.filteredData = [];
    }
  }
  filterDataw(filterValues: string) {
    if (this.myForm.value.whereto.length >= 1) {
      this.filteredData2 = this.flightdata.filter((item: any) =>
        item.name.toLowerCase().includes(filterValues.toLowerCase())
      );
      // this.flightCode = this.flightdata.code;
    } else {
      this.filteredData2 = [];
    }
  }

  // public options: any = {
  //   locale: { format: 'DD/MM/YYYY' },
  //   alwaysShowCalendars: false,
  // };

  // public selectedDate(value: any, datepicker: any) {
  //   console.log(value);

  //   datepicker.start = value.start;
  //   datepicker.end = value.end;

  //   this.daterange.start = value.start;
  //   this.daterange.end = value.end;
  //   this.daterange.label = value.label;
  // }

  updatePlaceholderText() {
    this.placeholderText = '';
  }
  updatePlaceholderText2() {
    this.placeholderText2 = '';
  }

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  onDate1Selected(event: MatDatepickerInputEvent<Date>) {
    this.date1 = event.value;
  }

  onDate2Selected(event: MatDatepickerInputEvent<Date>) {
    this.date2 = event.value;
  }

  onSubmit() {
    localStorage.setItem('formData', JSON.stringify(this.myForm.value));
    this.count++;
    // this.loading();
    // this.postData();
    // this.getData();

    // console.log(this.myForm.value);
    // this.router.navigateByUrl('/list', { state: this.myForm.value });
  }
  ngOnDestroy() {
    // cleanup code here
  }

  // const storedData = localStorage.getItem('loginData');
  // const parsedData = JSON.parse(storedData);

  // const storedData1 = localStorage.getItem('singupData');
  // const parsedData1 = JSON.parse(storedData1);

  // // const myObject = { email: 'mayank@123', password: '12345' };
  // const isEqual = JSON.stringify(parsedData) === JSON.stringify(parsedData1);

  // if (isEqual) {
  //     console.log('The data is equal!');
  //     this.log=true;
  //     // this.isAuthenticated();
  //     return true;

  //     // return this.log;
  //     // this.router.navigateByUrl('/d');
  // } else {
  //     console.log('The data is not equal!');
  // }
}
