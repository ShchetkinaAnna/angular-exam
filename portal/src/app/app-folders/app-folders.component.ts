import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { AuthService } from '../auth.service';

type TMenu = {
  Name: string;
  Id: number;
  Link: string;
};

@Component({
  selector: 'app-app-folders',
  templateUrl: './app-folders.component.html',
  styleUrls: ['./app-folders.component.css']
})
export class AppFoldersComponent implements OnInit {
  private eventSubscribe: Subscription;
  private activeId = 1;
  private activeMenu = false;
  private menusElements: Array<TMenu> = [
    { Name: "Почта", Id: 1, Link: "/client/mailbox" },
    { Name: "Контакты", Id: 2, Link: "/client/users" }     
  ];

  constructor(private router: Router, private route: ActivatedRoute, private _authService: AuthService) { 
    this.eventSubscribe = this.router.events.filter((event) => event instanceof NavigationEnd)
    .subscribe((event) => {
      let chComponent = this.route.children.find((item) => item.outlet == "primary");
      if (chComponent != null) {
        if (chComponent.snapshot.url.join("") == "users") 
        {
          this.activeId = 2;
        }
        else {
          this.activeId = 1; 
        };
      }
    });
  }  

  LogOut() {
    this._authService.logout(); 
  }

  getUserName() {
    return this._authService.login;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (!!this.eventSubscribe) { this.eventSubscribe.unsubscribe(); }
}

  getActiveName() {
    let sElement: TMenu = this.menusElements.find((item)=> item.Id == this.activeId);    
    return (sElement === undefined) ? "" : sElement.Name;
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  focusOutMenu() {
    this.activeMenu = false;
  }

  navigateMenu(nId: number, nLink: string) {
    this.activeId = nId;
    this.focusOutMenu();
    this.router.navigate([nLink], {relativeTo: this.route});
  }
}
