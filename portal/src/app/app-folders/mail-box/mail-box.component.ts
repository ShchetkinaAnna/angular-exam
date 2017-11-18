import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailserviceService, TFolder, TMailListItem } from './mailservice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {

  private folderList: Array<TFolder>;

  constructor(private route: ActivatedRoute, private _mailService: MailserviceService) {
  }

  ngOnInit() {
    this._mailService.getFolders().subscribe(
      (item: any) => { this.folderList = item; },
      (err: HttpErrorResponse) => this._mailService.handleError(err)
    );
  }

}
