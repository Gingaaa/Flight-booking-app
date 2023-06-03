import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;  

@Component({
  selector: 'app-bookingconfirmation',
  templateUrl: './bookingconfirmation.component.html',
  styleUrls: ['./bookingconfirmation.component.scss'],
})
export class BookingconfirmationComponent implements OnInit {

  slides = [
    {
      id: 1,
      img: '../../../assets/images/slide-1.jpg',
      title: 'Moraine Lake',
      subtitle: 'Lake thun',
    }
  ];

  payment: any[]=[];
  travelers: any[]=[];
  traveler: any[]=[];
  datadt:any;
  count:number=0;
  outbounddt: any[] = [];
  inbounddt: any[] = [];
  email:any;

  // html to pdf converter start here

  // @ViewChild('pdfTable')
  // pdfTable!: ElementRef;
  // // imageBlack = "../../../assets/images/logo_black.png"
  // slide: string = 'assets/images/slide-1.jpg';

  // images = {
  //   "image1": "data:assets/images/slide-1.jpg;base64,iVBORw0KGg..."
  // };

  // public downloadAsPDF() {
  //   const pdfTable = this.pdfTable.nativeElement;
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
  // }
    handleExport(){
      const invoiceContentElement=document.getElementById('invoice_container') as HTMLElement;
      html2canvas(invoiceContentElement,{}).then(canvas=>{
        //is convert the canvas into string url
        const imageData=canvas.toDataURL('image/png');
        //page width
        const pageWidht=210;
        const pageHeight = 297;
        //calculate the image actual height to fit with canvas and pdf
        const height = canvas.height*pageWidht/canvas.height
        // console.log(imageData)
        // initialize the pdf
        // const pdf=new jsPDF("p", "mm", "a4")
        // add the image into pdf
        // pdf.addImage(imageData,'PNG', 0, 0,)
        // pdf.addImage(imageData,'PNG',0,0,pageWidht,height);
        // pdf.save('invoice.pdf')
      })
    }

    // html to pdf converter end here

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute

    ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
      const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }

    });
    this.payment = history.state.payment;
    this.travelers = history.state.travelers;
    this.datadt = history.state.data;
    // console.log(this.datadt);
    this.outbounddt = this.datadt.FlightSegmentDetails.OutBoundSegment;
    this.inbounddt = this.datadt.FlightSegmentDetails.InBoundSegment;
    
    // if(this.count <= this.travelers.length){
    //   this.traveler.push(this.travelers[this.count]);
    //   this.count++;
    // }
    for(this.count;this.count < this.travelers.length;this.count++){
      this.traveler.push(this.travelers[this.count]);
    }
    console.log(this.traveler);
    this.email = this.traveler[0].email;
    console.log(this.email);
    
  }
}
