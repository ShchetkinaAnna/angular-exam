import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

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
    BrowserModule
  ],
  providers: [
    { provide: API_URL, useValue: 'http://10.1.3.56/GASPS.PublicPortal/api/' },
    UserproviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
