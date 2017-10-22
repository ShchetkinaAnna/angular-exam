import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { UsercardComponent } from './cardlist/usercard/usercard.component';

@NgModule({
  declarations: [
    AppComponent,
    CardlistComponent,
    UsercardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
