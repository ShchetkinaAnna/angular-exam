import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CardlistComponent } from './app-folders/cardlist/cardlist.component';
import { UsercardComponent } from './app-folders/cardlist/usercard/usercard.component';
import { UserproviderService, API_URL } from './userprovider.service';
import { LoginComponent } from './login/login.component';
import { MailBoxComponent } from './app-folders/mail-box/mail-box.component';
import { MailserviceService } from './mailservice.service';
import { MaillistComponent } from './app-folders/mail-box/maillist/maillist.component';
import { MessageComponent } from './app-folders/mail-box/message/message.component';
import { AppFoldersComponent } from './app-folders/app-folders.component';
import { UserinfoComponent } from './app-folders/cardlist/userinfo/userinfo.component';

const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: AppFoldersComponent, children:[
    { path: '', redirectTo: '/client/mailbox/inbox', pathMatch: 'full' },
    { path: 'mailbox', redirectTo: '/client/mailbox/inbox', pathMatch: 'full' },
    { path: 'mailbox/:folder', component: MailBoxComponent, children: [
      { path: '', component: MaillistComponent },
      { path: ':message', component: MessageComponent }
    ]},
    { path: 'users', children: [
      { path: '', component: CardlistComponent },
      { path: ':id', component: UserinfoComponent }
    ] }
  ] }
  
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
    MessageComponent,
    AppFoldersComponent,
    UserinfoComponent
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
