import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistComponent } from './cardlist.component';
import { SearchPipe } from './search.pipe';
import { UsercardComponent } from './usercard/usercard.component';
import { UsersexPipe } from './usersex.pipe';
import { UserproviderService } from './userprovider.service';
import { API_URL } from '../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';
import { MailserviceService } from '../mail-box/mailservice.service';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardlistComponent', () => {
  let component: CardlistComponent;
  let fixture: ComponentFixture<CardlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CardlistComponent, 
        SearchPipe, 
        UsercardComponent,
        UsersexPipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],  
      providers: [ UserproviderService,
        AppService,
        MailserviceService,
        { provide: API_URL, useValue: '' },
        UsersexPipe,
        DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
