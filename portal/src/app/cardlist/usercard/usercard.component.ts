import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TUserCard } from '../cardlist.component';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {

  @Input("user") user: TUserCard|undefined;
  @Input("selectedId") selectedId: number;
  @Output("userDeleted") userDeleted: EventEmitter<TUserCard|undefined> = new EventEmitter();
  @Output("userSelected") userSelected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.userDeleted.emit(this.user);
  }

  onSelect() {
    this.userSelected.emit(this.user.UserID);
  }

  SelectItem() {
    return this.user.UserID == this.selectedId ? "selected" : "";
  }

}
