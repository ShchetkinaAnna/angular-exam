import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserproviderService } from '../userprovider.service';
import { TUserCard } from '../cardlist.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataResolveService implements Resolve<TUserCard> {

  constructor(private _userproviderService: UserproviderService, private router: Router) { 
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TUserCard> {
    return this._userproviderService.getUserById(route.paramMap.get('id')).take(1).map((item: any) => {
        return {
          UserID : item.Id,
          BirthDate : item.BD,
          F: item.F,
          I: item.I,
          O: item.O,
          Sex: item.Sex,
          Email: item.Email
        };      
    }).catch((e) => {
      this.router.navigate(['/client/users']);
      return Observable.of(null);
    });
  }
}
