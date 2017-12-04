import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserproviderService } from '../cardlist/userprovider.service';
import { TShortUserList } from '../../comon';

@Injectable()
export class MailserviceService {
  private USER_CONTROLLER_URL: string;
  private _changeCountMessages: Subject<boolean>;

  private _shortUserList: BehaviorSubject<Array<TShortUserList>> = new BehaviorSubject(null);

  constructor(@Inject(API_URL) private API_URL: string,
    private _http: HttpClient,
    private _userproviderService: UserproviderService) { 
      this.USER_CONTROLLER_URL = this.API_URL + 'TestUserController/';
      this._changeCountMessages = new Subject<boolean>();
  }

  getChangeCountMessagesObs(): Observable<boolean> {
    return this._changeCountMessages.asObservable();
  }

  changeCountMessageFlag(val: boolean) {
    this._changeCountMessages.next(val);
  }

  public getShortUserList(): Observable<Array<TShortUserList>> {
    return this._shortUserList.asObservable();
  }
  public setShortUserList(val: Array<TShortUserList>) {
    this._shortUserList.next(val);
  }
  public updateShortUserList() {
    this._userproviderService.getUsers().subscribe(
      (item: any) => {
        this._shortUserList.next(item.UserList.map((userItem) => {return {
          Id: userItem.Id, 
          Value: userItem.F + ' ' + userItem.I + ' ' + userItem.O + ' <' + userItem.Email + '>'}}));
      }
    );
  }

  public getFolders() {
    let _url: string = `${this.USER_CONTROLLER_URL}GetFolders`;
    return this._http.get(_url);
  }

  public getMessages(folderId: string) {
    let _url: string = `${this.USER_CONTROLLER_URL}GetMessages/${folderId}`;
    return this._http.get(_url);
  }

  public deleteMails(mailsIds: string) {
    let _url: string = `${this.USER_CONTROLLER_URL}DeleteMails`;
    return this._http.post(_url, { mailsIds: mailsIds }, {responseType: "text"});
  }

  public getMessage(messageId: number) {
    let _url: string = `${this.USER_CONTROLLER_URL}GetMessageById/${messageId}`;
    return this._http.get(_url);
  }

  public addMessage(data: any) {    
    let _url: string = `${this.USER_CONTROLLER_URL}AddMessage`;
    return this._http.post(_url, data, {responseType: "text"});
  }
}
