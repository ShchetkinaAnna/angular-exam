import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserFormComponent } from './app-folders/cardlist/user-form/user-form.component';

export interface UserForm {
  canDeactivate() : boolean;
}

@Injectable()
export class SaveFormGuard implements CanDeactivate<UserForm> {
  canDeactivate(component: UserForm) {
    return component.canDeactivate() ?
    true : window.confirm("На странице есть несохраненные изменения. Хотите покинуть страницу?");
  }
}
