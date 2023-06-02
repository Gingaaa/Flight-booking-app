import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../interface/menu.interface';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userImage: string = "assets/images/user.png";
  logoImage: string = "assets/images/logo.png";
  logoHead: string = "assets/images/headr.png";
  logoblack: string = "assets/images/logo_black.png";
  menuItems: Menu[] = [];
  public href: string = "";
  constructor(private _menuService: MenuService,private router: Router) {
    // const currentPath = this.router.url;
    // if (currentPath === '') {
    //   window.addEventListener('scroll', this.scroll, true);
    // }
    window.addEventListener('scroll', this.scroll, true);
   }

  ngOnInit(): void {
    this.menuItems = this._menuService.MENUITEMS;
  }
  toggleNavActive(item: Menu) {
    item.active = !item.active;
  }
  scroll = (event: any): void => {
    //  debugger;
    this.href = this.router.url;     
    const navbar:any = document.querySelector('.navbar');
      if (window.pageYOffset > navbar.clientHeight && this.router.url === "/") {
        
        navbar?.classList.add('scrolled');
        if(this.href.replace('/','').trim() == '')
        {
          navbar?.classList.add('header-white');
        }
      } else {
        navbar?.classList.remove('scrolled');
      }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

}
