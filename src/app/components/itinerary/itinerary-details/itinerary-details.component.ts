import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-itinerary-details',
  templateUrl: './itinerary-details.component.html',
  styleUrls: ['./itinerary-details.component.scss']
})
export class ItineraryDetailsComponent implements OnInit {
  @Output() itenary = new EventEmitter<{ title: string }>();
  bookTitle: string="clicked";
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup|any;
  // changevalue:number|any;
  @Output() changevalue = new EventEmitter<string>();
  @Input() datadt:any;
  outbounddt: any[] = [];
  inbounddt: any[] = [];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
      const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }

    });
    this.outbounddt = this.datadt.FlightSegmentDetails.OutBoundSegment;
    this.inbounddt = this.datadt.FlightSegmentDetails.InBoundSegment;
  }
  change(){
    this.changevalue.emit("traveler");
  }

}
