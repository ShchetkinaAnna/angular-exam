import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardlistComponent } from './app-folders/cardlist/cardlist.component';
import { UsercardComponent } from './app-folders/cardlist/usercard/usercard.component';
import { UserproviderService } from './app-folders/cardlist/userprovider.service';
import { LoginComponent } from './login/login.component';
import { MailBoxComponent } from './app-folders/mail-box/mail-box.component';
import { MailserviceService } from './app-folders/mail-box/mailservice.service';
import { MaillistComponent } from './app-folders/mail-box/maillist/maillist.component';
import { MessageComponent } from './app-folders/mail-box/message/message.component';
import { AppFoldersComponent } from './app-folders/app-folders.component';
import { UserFormComponent } from './app-folders/cardlist/user-form/user-form.component';
import { UsersexPipe } from './app-folders/cardlist/usersex.pipe';
import { SaveFormGuard } from './save-form.guard';
import { SearchComponent } from './app-folders/search/search.component';
import { AppService } from './app-folders/app.service';
import { SearchPipe } from './app-folders/cardlist/search.pipe';
import { DatePipe } from '@angular/common';
import { UserDataResolveService } from './app-folders/cardlist/user-form/user-data-resolve.service';
import { API_URL, AuthService } from './auth.service';
import { SearchmailPipe } from './app-folders/mail-box/searchmail.pipe';
import { MessageFormComponent } from './app-folders/mail-box/message-form/message-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { AuthGuard } from './auth.guard';

const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'client', component: AppFoldersComponent, children:[
    { path: 'search', component: SearchComponent, outlet: "search" },
    { path: '', redirectTo: '/client/(mailbox/inbox//search:search)', pathMatch: 'full' },
    { path: 'mailbox', redirectTo: '/client/(mailbox/inbox//search:search)', pathMatch: 'full' },
    { path: 'mailbox/:folder', redirectTo: '/client/(mailbox/:folder//search:search)', pathMatch: 'full' },
    { path: 'mailbox/:folder', component: MailBoxComponent, children: [      
      { path: '', component: MaillistComponent },
      { path: 'addMessage', component: MessageFormComponent, canActivate: [SaveFormGuard], canDeactivate: [SaveFormGuard] },
      { path: ':message', component: MessageComponent, canActivate: [SaveFormGuard] }
    ]},
    { path: 'users', redirectTo: '/client/(users//search:search)', pathMatch: 'full' },    
    { path: 'users', children: [
      { path: '', component: CardlistComponent },
      { path: 'addUser', component: UserFormComponent, canDeactivate: [SaveFormGuard], canActivate: [SaveFormGuard] },
      { path: ':id', component: UserFormComponent, canDeactivate: [SaveFormGuard], canActivate: [SaveFormGuard], resolve:{ user: UserDataResolveService } }
    ] }
  ] }
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
    UserFormComponent,
    UsersexPipe,
    SearchComponent,
    SearchPipe,
    SearchmailPipe,
    MessageFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: API_URL, useValue: 'http://scad.cloud.parmalogica.ru/test/api/' },
    UserproviderService,
    MailserviceService,
    SaveFormGuard,
    AuthGuard,
    AppService,
    UsersexPipe,
    DatePipe,
    UserDataResolveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
