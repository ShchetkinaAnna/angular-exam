import { Component, OnInit } from '@angular/core';
import { MailserviceService, TMailListItem } from '../mailservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-maillist',
  templateUrl: './maillist.component.html',
  styleUrls: ['./maillist.component.css']
})
export class MaillistComponent implements OnInit {

  private folderId: string;
  private mailItems: Array<TMailListItem>;

  constructor(private route: ActivatedRoute, private _mailService: MailserviceService) { }

  private getMessages(folder) {
    this.folderId = folder;
    this._mailService.getMessages(this.folderId).subscribe(
      (item: any) => { this.mailItems = item; },
      (err: HttpErrorResponse) => this._mailService.handleError(err)
    );;
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.getMessages(params.folder));
  }

  public getCheckedFlag() {
    /*let selElem:TUserCard = this.userCards.find((elem) => elem.Checked);
    return (selElem == null) ? true : false;*/
    return true;
  }

  onCheckedAll(toggleElementVal) {
   // this.userCards.forEach((item) => {item.Checked = toggleElementVal;});
  }

}
