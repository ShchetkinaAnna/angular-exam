import { Component, OnInit } from '@angular/core';
import { UserproviderService } from '../../userprovider.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

export type TUserCard = {
  UserID: number;
  BirthDate: number;
  F: string;
  I: string;
  O: string;
  Sex: number;
  Email: string;
  Checked: boolean;  
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

  constructor(private _userproviderService: UserproviderService, private router: Router, private route: ActivatedRoute ) { 
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
      }))},
      (err: HttpErrorResponse) => this._userproviderService.handleError(err)
    );
  }

  ngOnInit() {
    this.getList();    
  }

  private onDelete() {
    let ids: string = "";
    this.userCards.forEach((item)=>{ item.Checked ? ids=ids+(ids.length == 0 ? "":"|")+item.UserID : "";});
    this._userproviderService.deleteUsers(ids).subscribe(
      () => this.getList(),
      (err: HttpErrorResponse) => this._userproviderService.handleError(err)
    );
  }

  private getCheckedFlag() {
    let selElem:TUserCard = this.userCards.find((elem) => elem.Checked);
    return (selElem == null) ? true : false;
  }

  public selectUserCard(item: TUserCard) {
    let selElem:TUserCard = this.userCards.find((elem) => elem.UserID == item.UserID);
    selElem.Checked = item.Checked;
  }

  onCheckedAll(toggleElementVal) {
    this.userCards.forEach((item) => {item.Checked = toggleElementVal;});
  }

}
