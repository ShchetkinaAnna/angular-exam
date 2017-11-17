import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserFormComponent } from './app-folders/cardlist/user-form/user-form.component';

export interface UserForm {
  canDeactivate() : boolean;
}

@Injectable()
export class SaveFormGuard implements CanDeactivate<UserForm>, CanActivate {
  constructor(private router: Router) {   
  }

  canDeactivate(component: UserForm) {
    return component.canDeactivate() ?
    true : window.confirm("На странице есть несохраненные изменения. Хотите покинуть страницу?");
  };

  getPrimaryOutlet(routeSnap: ActivatedRouteSnapshot):string {
    let res_path: string = "";
    if (routeSnap != null) {
      res_path = routeSnap.url.join("") + "/" + this.getPrimaryOutlet(routeSnap.children.find((item) => item.outlet == "primary"));
    }
    return res_path;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  /*  debugger;
    if ((state.root.children[0].children.find((item) => item.outlet == "search") != null) 
  && route.url.join("") == "addUser") {
      this.router.navigateByUrl("/client/users/addUser");
      return false;
    }
    else {
      return true;
    }*/
debugger;
    let path = this.getPrimaryOutlet(state.root);
    //path = path.substr(0, path.length - 2);
console.log(path);

    return true;

    /*let chComponent = state.root.children.find((item) => item.outlet == "primary");
    if (chComponent != null) {
      console.log(chComponent.url.join(""));
      if (chComponent.url.join("") == "users") 
      {
        
      }
      else {
        
      };
    }*/
    //this.router.navigate(['/client/users/addUser']);    
  }
}
