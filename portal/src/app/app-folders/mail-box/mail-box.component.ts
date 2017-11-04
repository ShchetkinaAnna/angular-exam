import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailserviceService, TFolder, TMailListItem } from '../../mailservice.service';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {

  private folderList: Array<TFolder>;
  
  

  constructor(private route: ActivatedRoute, private mailsvc: MailserviceService) {

  }

  

  ngOnInit() {
    this.folderList = this.mailsvc.getFolders();
  }

}
