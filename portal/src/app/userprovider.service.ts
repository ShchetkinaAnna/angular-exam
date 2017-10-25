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

  public GetUsers() {
    let _url: string = `${this.USER_CONTROLLER_URL}GetUsers`;
    return this._http.get(_url);
  }

  public DeleteUser(userId: number) {
    let _url: string = `${this.USER_CONTROLLER_URL}DeleteUser/${userId}`;
    return this._http.get(_url);
  }

  public HandleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }



}
