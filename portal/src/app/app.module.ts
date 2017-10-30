import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { UsercardComponent } from './cardlist/usercard/usercard.component';
import { UserproviderService, API_URL } from './userprovider.service';
import { LoginComponent } from './login/login.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { MailserviceService } from './mailservice.service';
import { MaillistComponent } from './mail-box/maillist/maillist.component';
import { MessageComponent } from './mail-box/message/message.component';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'mailbox', redirectTo: '/mailbox/inbox', pathMatch: 'full' },
  { path: 'mailbox/:folder', component: MailBoxComponent, children: [
    { path: '', component: MaillistComponent },
    { path: ':message', component: MessageComponent }
  ]}
  
  //{ path: '', component: }
];

@NgModule({
  declarations: [
    AppComponent,
    CardlistComponent,
    UsercardComponent,
    LoginComponent,
    MailBoxComponent,
    MaillistComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: API_URL, useValue: 'http://scad.cloud.parmalogica.ru/test/api/' },
    UserproviderService,
    MailserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
