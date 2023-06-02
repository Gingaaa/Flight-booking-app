import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
      this.router.events.subscribe(event => {
        const header:any = document.querySelector('#header');
        if(this.router.url === "/") {
          header?.classList.add('fixed-top');
          header?.classList.remove('header-white');
        }else {
          header?.classList.remove('fixed-top');
          header?.classList.add('header-white');
        }
      })
  };

  title = '';
}
