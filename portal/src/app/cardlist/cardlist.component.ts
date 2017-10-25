import { Component, OnInit } from '@angular/core';
import { UserproviderService } from '../userprovider.service';
import { HttpErrorResponse } from '@angular/common/http';


export type TUserCard = {
  UserID: number;
  UserName: string;
  BirthDate: number;
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

  constructor(private _userproviderService: UserproviderService) { 
    //this.userCards = this._data.UserList;
    //this.userCards = new Array<TUserCard>();
  }

  private GetList() {
    this.userCards = new Array<TUserCard>();
    this._userproviderService.GetUsers().subscribe(
      (data: any) => {data.UserList.forEach(item => this.userCards.push({UserID:item.Id, UserName: item.Name, BirthDate: Date.parse(item.BD)}))},
      (err: HttpErrorResponse) => this._userproviderService.HandleError(err)
    );
  }

  ngOnInit() {
    this.GetList();    
  }

  public DeleteSelected(item: TUserCard) {
    this._userproviderService.DeleteUser(item.UserID).subscribe(
      () => this.FilterUsers(item),
      (err: HttpErrorResponse) => this._userproviderService.HandleError(err)
    );
  }

  public FilterUsers(item: TUserCard) {
    this.userCards = this.userCards.filter((elem: TUserCard) => elem.UserID != item.UserID );
  }

  public SelectUserCard(id: number) {
    this.selectedUserId = id;
  }

}
