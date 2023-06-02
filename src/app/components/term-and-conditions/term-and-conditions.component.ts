import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-term-and-conditions',
  templateUrl: './term-and-conditions.component.html',
  styleUrls: ['./term-and-conditions.component.scss']
})
export class TermAndConditionsComponent implements OnInit {

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
