import { Component, OnInit } from '@angular/core';
import { UserproviderService } from './userprovider.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs/Subscription';
import { MailserviceService } from '../mail-box/mailservice.service';

export type TUserCard = {
  UserID: number;
  BirthDate: number;
  F: string;
  I: string;
  O: string;
  Sex: 0|1|-1;
  Email: string;
  Checked?: boolean;  
};

export type TUserList = {
  UserList: Array<TUserCard>;  
};

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  public userCards: Array<TUserCard>;
  private searchText: string = "";
  private checkedAll: boolean = false;
  private searchSubscribe: Subscription;

  constructor(private _userproviderService: UserproviderService, 
    private router: Router, private route: ActivatedRoute,
    private _appService: AppService,
    private _mailService: MailserviceService ) { 
      this.searchSubscribe = this._appService.getSearchObs().subscribe((val) => { this.searchText = val; } );
  }
  
  ngOnDestroy() {
    if (!!this.searchSubscribe) { this.searchSubscribe.unsubscribe(); }
  }

  private onAdd() {
    this.router.navigate(["./addUser", {}], {relativeTo: this.route});
  }

  private getList() {
    this.userCards = new Array<TUserCard>();
    this._userproviderService.getUsers().subscribe(
      (data: any) => {data.UserList.forEach(item => this.userCards.push({
        UserID:item.Id, 
        BirthDate: Date.parse(item.BD),
        F: item.F,
        I: item.I,
        O: item.O,
        Sex: item.Sex,
        Email: item.Email,
        Checked: false
      }));      
    }
    );
  }

  ngOnInit() {
    this.getList();    
  }

  private onDelete() {
    let result: boolean = confirm("Вы уверены, что хотите удалить? Письма от пользователя после удаления станут недосутпны.");
    if (result) {
      let ids: string = this.userCards.filter((item)=> item.Checked).map((item)=> {return item.UserID;}).join("|");
      this._userproviderService.deleteUsers(ids).subscribe(
        () => { this._mailService.setShortUserList(null); this.getList(); this.checkedAll = false; }
      );
    }
  }

  public getCheckedFlag() {
    let selElem:TUserCard = this.userCards.find((elem) => elem.Checked);
    return (selElem == null) ? true : false;
  }

  public selectUserCard(item: TUserCard) {
    let selElem:TUserCard = this.userCards.find((elem) => elem.UserID == item.UserID);
    selElem.Checked = item.Checked;
  }

  onCheckedAll(toggleElementVal) {
    this.checkedAll = toggleElementVal;
    this.userCards.forEach((item) => {item.Checked = toggleElementVal;});
  }

}
