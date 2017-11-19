import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export const API_URL = new InjectionToken<string>('API_URL');

type AuthObject = {
  Token: string,
  Error: string
};

@Injectable()
export class AuthService {
  USER_CONTROLLER_URL: string;
  login: string;

  constructor(@Inject(API_URL) private API_URL: string, private _http: HttpClient, private router: Router) {
    this.USER_CONTROLLER_URL = this.API_URL + 'AuthController/';  
    this.login = localStorage.getItem('login');
  }  

  authorization(login: string, password: string) {
    this.login = login;
    let _url: string = `${this.USER_CONTROLLER_URL}Auth`;
    return this._http.post(_url, { login: this.login, password: password }).subscribe((item: AuthObject) => { 
      if (item.Token != null) {
        localStorage.setItem('token', item.Token);
        localStorage.setItem('login', this.login);
        this.router.navigate(["/client"]); 
      }
      else {
        alert(item.Error);
      }
    }, 
    (err: HttpErrorResponse) => this.handleError(err)
    );
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    this.login = null;
    this.router.navigate(["/login"]); 
  }

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }
}
