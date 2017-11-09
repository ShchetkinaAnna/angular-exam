import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { UserFormComponent } from './app-folders/cardlist/user-form/user-form.component';
import { UsersexPipe } from './app-folders/cardlist/usersex.pipe';
import { SaveFormGuard } from './save-form.guard';
import { UserFormTdComponent } from './app-folders/cardlist/user-form-td/user-form-td.component';
import { ValidateBdDirective } from './app-folders/cardlist/user-form-td/validate-bd.directive';

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
      { path: 'addUser', component: UserFormComponent, canDeactivate: [SaveFormGuard] },
      { path: 'addUserTd', component: UserFormTdComponent, canDeactivate: [SaveFormGuard] },
      { path: ':id', component: UserinfoComponent }
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
    UserinfoComponent,
    UserFormComponent,
    UsersexPipe,
    UserFormTdComponent,
    ValidateBdDirective
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
    UserproviderService,
    MailserviceService,
    SaveFormGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
