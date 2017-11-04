import { Component, OnInit } from '@angular/core';
import { MailserviceService, TMailListItem } from '../../../mailservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maillist',
  templateUrl: './maillist.component.html',
  styleUrls: ['./maillist.component.css']
})
export class MaillistComponent implements OnInit {

  private folderId: string;
  private mailItems: Array<TMailListItem>;

  constructor(private route: ActivatedRoute, private mailsvc: MailserviceService) { }

  private getMessages(folder) {
    this.folderId = folder;
    this.mailItems = this.mailsvc.getMessages(this.folderId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.getMessages(params.folder));
  }

}
