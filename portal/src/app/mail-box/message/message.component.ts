import { Component, OnInit } from '@angular/core';
import { MailserviceService, TMailMessage } from '../../mailservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private messageId: string;
  private message: TMailMessage;

  constructor(private route: ActivatedRoute, private mailsvc: MailserviceService) { }

  private GetMessage(message) {
    this.messageId = message;
    this.message = this.mailsvc.GetMessage(this.messageId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.GetMessage(params.message));
  }

}
