import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailserviceService } from './mailservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { TFolder } from '../../comon';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {
  public folderList: Array<TFolder>;
  public deleteSubscribe: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private _mailService: MailserviceService) {    
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
    this.deleteSubscribe = this._mailService.getChangeCountMessagesObs().subscribe((val) => { this.getFolders(); } );    
    this.getFolders();
  }

  public onAdd() {
    this.router.navigate(["./addMessage"], {relativeTo: this.route});
  }

}
