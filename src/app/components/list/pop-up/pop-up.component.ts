import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  @Input() myForm: any;
  title:any;
  flightdata: any[] = [];
  outbounddt: any[] = [];
  inbounddt: any[] = [];
  totalfare:number|any;

  constructor(private router: Router,public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
    this.flightdata = this.data;
    this.totalfare = this.data.TotalFare;
    // console.log(this.flightdata);
    this.outbounddt = this.data.FlightSegmentDetails.OutBoundSegment;
    this.inbounddt = this.data.FlightSegmentDetails.InBoundSegment;
    // console.log(this.outbounddt);
  }

  submit(){
    this.router.navigateByUrl('/itinerary', { state: this.data });
  }
  

}
