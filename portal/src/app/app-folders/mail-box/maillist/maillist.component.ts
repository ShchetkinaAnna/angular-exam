import { Component, OnInit } from '@angular/core';
import { MailserviceService, TMailListItem } from '../mailservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-maillist',
  templateUrl: './maillist.component.html',
  styleUrls: ['./maillist.component.css']
})
export class MaillistComponent implements OnInit {
  private searchText: string = "";
  private folderId: string;
  private mailItems: Array<TMailListItem>;
  private checkedAll: boolean = false;
  private searchSubscribe: Subscription;
  private routeParamsSubscribe: Subscription;
  
  constructor(private router: Router, private route: ActivatedRoute, private _mailService: MailserviceService, private _appService: AppService) { 
    this.searchSubscribe = this._appService.getSearchObs().subscribe((val) => { this.searchText = val; } );
  }

  ngOnDestroy() {
    if (!!this.searchSubscribe) { this.searchSubscribe.unsubscribe(); }
    if (!!this.routeParamsSubscribe) { this.routeParamsSubscribe.unsubscribe(); }
  }

  private getMessages() {
    this._mailService.getMessages(this.folderId).subscribe(
      (item: any) => { this.mailItems = item; }
    );
  }

  ngOnInit() {    
    this.routeParamsSubscribe = this.route.params.subscribe(params => { this.checkedAll = false; this.folderId = params.folder; this.getMessages() });
  }

  public getCheckedFlag() {
    if (this.mailItems != undefined) {
      let selElem:TMailListItem = this.mailItems.find((elem) => elem.Checked);
      return (selElem == null) ? true : false;
    }
    return false;
  }

  onCheckedAll(toggleElementVal) {
    this.checkedAll = toggleElementVal;
    this.mailItems.forEach((item) => {item.Checked = toggleElementVal;});
  }

  checkElement(event, item) {    
    item.Checked = !item.Checked;
  }

  goToMessage(messageId: number) {
    this.router.navigate([messageId], {relativeTo: this.route});
  }

  onDelete() {
    let txtConfirm = "Вы уверены, что хотите удалить? Письма будут перемещены в папку 'Удаленные'.";
    if (this.folderId == 'trashbin') {
      txtConfirm = "Вы уверены, что хотите удалить? Письма будут удалены без возможности восстановления.";
    }

    let result: boolean = confirm(txtConfirm);
    if (result) {
      let ids: string = this.mailItems.filter((item)=> item.Checked).map((item)=> {return item.Id;}).join("|");
      this._mailService.deleteMails(ids).subscribe(
        () => { this._mailService.changeDelMessageFlag(true); this.getMessages(); this.checkedAll = false; }
      );
    }
  }
}
