import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export const API_URL = new InjectionToken<string>('API_URL');

@Injectable()
export class UserproviderService {

  private USER_CONTROLLER_URL: string;

  constructor(@Inject(API_URL) private API_URL: string,
              private _http: HttpClient) {
    this.USER_CONTROLLER_URL = this.API_URL + 'TestUserController/';
  }

  public getUsers() {
    let _url: string = `${this.USER_CONTROLLER_URL}GetUsers`;
    return this._http.get(_url);
  }

  public deleteUsers(userIds: string) {
    let _url: string = `${this.USER_CONTROLLER_URL}DeleteUsers`;
    return this._http.post(_url, { userIds: userIds }, {responseType: "text"});
  }

  public addUser(data: any) {
    let _url: string = `${this.USER_CONTROLLER_URL}AddUser`;
    return this._http.post(_url, data, {responseType: "text"});
  }

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }



}
