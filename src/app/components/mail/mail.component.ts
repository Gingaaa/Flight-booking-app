import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookingconfirmation',
  templateUrl: './bookingconfirmation.component.html',
  styleUrls: ['./bookingconfirmation.component.scss'],
})
export class MailComponent implements OnInit {
  payment: any[]=[];
  travelers: any[]=[];
  traveler: any[]=[];
  count:number=0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.payment = history.state.payment;
    this.travelers = history.state.travelers;
    // if(this.count <= this.travelers.length){
    //   this.traveler.push(this.travelers[this.count]);
    //   this.count++;
    // }
    for(this.count;this.count < this.travelers.length;this.count++){
      this.traveler.push(this.travelers[this.count]);
    }
    console.log(this.traveler);
    
  }
}
