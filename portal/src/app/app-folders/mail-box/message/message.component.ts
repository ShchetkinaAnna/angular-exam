import { Component, OnInit } from '@angular/core';
import { MailserviceService } from '../mailservice.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';
import { TMailListItem } from '../../../comon';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public messageId: number;
  public message: TMailListItem;
  public routeParamsSubscribe: Subscription;

  constructor(private route: ActivatedRoute, private _mailService: MailserviceService) { }

  public getMessage(message) {
    this.messageId = message;
    this._mailService.getMessage(this.messageId).subscribe(
      (item: TMailListItem) => { this.message = item; }
    );
  }

  ngOnInit() {
    this.routeParamsSubscribe = this.route.params.subscribe(params => this.getMessage(params.message));
  }

  ngOnDestroy() {
    if (!!this.routeParamsSubscribe) { this.routeParamsSubscribe.unsubscribe(); }
  }
}
