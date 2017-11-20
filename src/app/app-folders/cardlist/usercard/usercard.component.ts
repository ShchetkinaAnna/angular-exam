import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TUserCard } from '../../../comon';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {

  @Input("user") user: TUserCard;
  @Input("indexElem") indexElem: number;  
  @Output("userSelected") userSelected: EventEmitter<TUserCard> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToCard(userId: number) {
    this.router.navigate([userId], {relativeTo: this.route});
  }

  clickOnCheckDelete(event) {
    this.userSelected.emit(this.user);
  }

  checkElement(event) {    
    this.user.Checked = !this.user.Checked;
    this.userSelected.emit(this.user);
  }
}
