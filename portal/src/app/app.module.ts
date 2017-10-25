import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { UsercardComponent } from './cardlist/usercard/usercard.component';
import { UserproviderService, API_URL } from './userprovider.service';



@NgModule({
  declarations: [
    AppComponent,
    CardlistComponent,
    UsercardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: API_URL, useValue: 'http://scad.cloud.parmalogica.ru/test/api/' },
    UserproviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
