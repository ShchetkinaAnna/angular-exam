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
  /*private _data: TUserList = {
    UserList: [
      {
        UserID: 1,
        UserName: "Иванов Иван Иванович"
      },
      {
        UserID: 2,
        UserName: "Семенов Семен Семенович"
      },
      {
        UserID: 3,
        UserName: "Петров Петр Петрович"
      }

    ]
  };*/
  public userCards: Array<TUserCard>;
  public selectedUserId: number;

  constructor(private _userproviderService: UserproviderService, private router: Router, private route: ActivatedRoute ) { 
    //this.userCards = this._data.UserList;
    //this.userCards = new Array<TUserCard>();
  }

  private onAdd() {
    this.router.navigate(["./addUser"], {relativeTo: this.route});
  }

  private onAddTd() {
    this.router.navigate(["./addUserTd"], {relativeTo: this.route});
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
        Email: item.Email
      }))},
      (err: HttpErrorResponse) => this._userproviderService.handleError(err)
    );
  }

  ngOnInit() {
    this.getList();    
  }

  public deleteSelected(item: TUserCard) {
    this._userproviderService.deleteUser(item.UserID).subscribe(
      () => this.filterUsers(item),
      (err: HttpErrorResponse) => this._userproviderService.handleError(err)
    );
  }

  public filterUsers(item: TUserCard) {
    this.userCards = this.userCards.filter((elem: TUserCard) => elem.UserID != item.UserID );
  }

  public selectUserCard(id: number) {
    this.selectedUserId = id;
  }

}
