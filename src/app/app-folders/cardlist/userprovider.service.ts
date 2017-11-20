import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../auth.service';

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

  public getUserById(id: string) {
    let _url: string = `${this.USER_CONTROLLER_URL}GetUserById/${id}`;
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

  public editUser(id: number, data: any) {    
    let _url: string = `${this.USER_CONTROLLER_URL}EditUser`;
    data.id = id;
    return this._http.post(_url, data, {responseType: "text"});
  }
}
