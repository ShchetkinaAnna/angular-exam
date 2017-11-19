import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailserviceService, TFolder, TMailListItem } from './mailservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {
  public folderList: Array<TFolder>;
  private deleteSubscribe: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private _mailService: MailserviceService) {    
    this.deleteSubscribe = this._mailService.getDeleteMessagesObs().subscribe((val) => { this.getFolders(); } );
  }

  ngOnDestroy() {
    if (!!this.deleteSubscribe) { this.deleteSubscribe.unsubscribe(); }
  }

  getFolders() {
    this._mailService.getFolders().subscribe(
      (item: any) => { this.folderList = item; }
    );
  }

  ngOnInit() {
    this.getFolders();
  }

  public onAdd() {
    this.router.navigate(["./addMessage", {}], {relativeTo: this.route});
  }

}
