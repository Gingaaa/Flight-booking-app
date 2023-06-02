import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-checkmybooking',
  templateUrl: './checkmybooking.component.html',
  styleUrls: ['./checkmybooking.component.scss']
})
export class CheckmybookingComponent implements OnInit {

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);

        const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
          this.viewportScroller.scrollToAnchor(fragment);
        }
      }
    });
  }

}
