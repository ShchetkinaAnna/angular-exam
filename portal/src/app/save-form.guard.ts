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
      res_path = routeSnap.url.join("/") + "/" + this.getPrimaryOutlet(routeSnap.children.find((item) => item.outlet == "primary"));
    }
    return res_path;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if ((state.root.children[0].children.find((item) => item.outlet == "search") != null)) {
        let path = this.getPrimaryOutlet(state.root);
        this.router.navigateByUrl(path.substr(0, path.length - 1));
        return false;
      }
      else {
        return true;
      }
    }
}
