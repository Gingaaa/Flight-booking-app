import { Injectable } from '@angular/core';
import { Menu } from '../interface/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  MENUITEMS: Menu[] = [
    { title: 'Home', path: '', icon: 'home', type: 'link', active: true },
    // { title: 'Flights', path: 'flight', type: 'link', active: false },
    { title: 'About', path: 'about', type: 'link', active: false },
    // { title: 'list', path: 'list', type: 'link', active: false },
    // { title: 'itinerary', path: 'itinerary', type: 'link', active: false },
    // { title: 'Book Confirm', path: 'bookingconfirmation', type: 'link', active: false },
    // { title: 'Check my booking', path: 'checkmybooking', type: 'link', active: false },
    // { title: 'Support', path: 'support', type: 'link', active: false },
    // { title: 'blog', path: 'blog', type: 'link', active: false },
    // { title: 'emailer', path: 'emailer', type: 'link', active: false },
  ];
}
