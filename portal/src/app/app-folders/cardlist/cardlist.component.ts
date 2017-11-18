import { Component, OnInit, ViewChild } from '@angular/core';
import { UserproviderService } from './userprovider.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

export type TUserCard = {
  UserID: number;
  BirthDate: number;
  F: string;
  I: string;
  O: string;
  Sex: 0|1;
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
  @ViewChild('chbAll') chbAll; 

  constructor(private _userproviderService: UserproviderService, 
    private router: Router, private route: ActivatedRoute,
    private _appService: AppService ) { 
      this._appService.getSearchObs().subscribe((val) => { this.searchText = val; } );
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
    },
      (err: HttpErrorResponse) => this._userproviderService.handleError(err)
    );
  }

  ngOnInit() {
    this.getList();    
  }

  private onDelete() {
    let result: boolean = confirm("Вы уверены, что хотите удалить?");
    if (result) {
      let ids: string = "";
      this.userCards.forEach((item)=>{ item.Checked ? ids=ids+(ids.length == 0 ? "":"|")+item.UserID : "";});
      this._userproviderService.deleteUsers(ids).subscribe(
        () => { this.getList(); this.chbAll.nativeElement.checked = false; },
        (err: HttpErrorResponse) => this._userproviderService.handleError(err)
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
    this.userCards.forEach((item) => {item.Checked = toggleElementVal;});
  }

}
