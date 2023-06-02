import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interface/menu.interface';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  logoImage: string = "assets/images/dashboard/SahosoftMallBachend-logo.png";
  userImage: string = "assets/images/user.png";
  fullName: string = "chandrajeet";
  emailId: string = "mailtodesigner360@gmail.com";
  menuItems: Menu[] = [];

  constructor(private _menuService: MenuService) { }

  ngOnInit(): void {
    this.menuItems = this._menuService.MENUITEMS;
  }

  toggleNavActive(item: Menu) {
    item.active = !item.active;
  }

}
