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
import { API_URL } from './main.service';

const routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'client', component: AppFoldersComponent, children:[
    { path: 'search', component: SearchComponent, outlet: "search" },
    { path: '', redirectTo: '/client/(mailbox/inbox//search:search)', pathMatch: 'full' },
    { path: 'mailbox', redirectTo: '/client/(mailbox/inbox//search:search)', pathMatch: 'full' },
    { path: 'mailbox/:folder', redirectTo: '/client/(mailbox/:folder//search:search)', pathMatch: 'full' },
    { path: 'mailbox/:folder', component: MailBoxComponent, children: [
      { path: '', component: MaillistComponent },
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
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: API_URL, useValue: 'http://scad.cloud.parmalogica.ru/test/api/' },
    //{ provide: API_URL, useValue: 'http://localhost/GASPS.Test/api/' },    
    UserproviderService,
    MailserviceService,
    SaveFormGuard,
    AppService,
    UsersexPipe,
    DatePipe,
    UserDataResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
