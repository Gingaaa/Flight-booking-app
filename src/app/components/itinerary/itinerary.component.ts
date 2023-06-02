import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router, NavigationStart,NavigationEnd, ActivatedRoute  } from '@angular/router';
import response from '../../json/response.json';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
})
export class ItineraryComponent implements OnInit {
  data: any;
  arr: any;
  totaltraveler: any;
  checked: string | any;
  value: boolean = false;
  count: number = 0;
  tabGroup: MatTabGroup | any;
  selectedTabIndex: number = 0;
  itenarychh: boolean = false;
  traveleradd: boolean = true;
  paymentch: boolean = true;
  updatetravelers:any[]=[];
  datadt:any[] = [];
  adult:number|any;
  child:number|any;
  infant:number|any;
  totalamount:any;

  


  constructor(
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
    const storedData: any = localStorage.getItem('formData');
    const parsedData = JSON.parse(storedData);
    this.totaltraveler = parsedData.trtotal;
    this.adult = parsedData.travelerclass.adults;
    this.child = parsedData.travelerclass.child;
    this.infant = parsedData.travelerclass.infant;
    console.log(parsedData);
    // console.log(history.state);
    this.datadt = history.state;
    console.log(this.datadt); 
    this.totalamount = (this.adult*405) + (this.child*260) + (this.infant*105)  
  }

  itenary(eventData: { title: string }) {
    this.checked = eventData.title;
    if (this.checked === 'clicked') {
      this.value = true;
      this.count = 1;
    }
  }
  travel(eventData: { title: string }) {
    this.checked = eventData.title;
    if (this.checked === 'clicked') {
      this.value = true;
      this.count = 1;
    }
  }

  addItem(newItem: string) {
    if (newItem == 'traveler') {
      this.selectedTabIndex = 1;
      this.itenarychh = true;
      this.traveleradd = false;
      this.paymentch = true;
    }
    if (newItem == 'payment') {
      this.selectedTabIndex = 2;
      this.itenarychh = true;
      this.traveleradd = true;
      this.paymentch = false;
    }
    if (newItem == 'itenary') {
      this.selectedTabIndex = 0;
      this.itenarychh = false;
      this.traveleradd = true;
      this.paymentch = true;
    }
  }

  updateItem(value: any[]) {
    console.log(value);
    this.updatetravelers = value;
  }
}
