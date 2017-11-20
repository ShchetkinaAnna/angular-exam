import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaillistComponent } from './maillist.component';
import { SearchmailPipe } from '../searchmail.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../mailservice.service';
import { API_URL } from '../../../auth.service';
import { UserproviderService } from '../../cardlist/userprovider.service';
import { AppService } from '../../app.service';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MaillistComponent', () => {
  let component: MaillistComponent;
  let fixture: ComponentFixture<MaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MaillistComponent,
        SearchmailPipe ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MailserviceService,
        UserproviderService,
        AppService,
        { provide: API_URL, useValue: '' },
        DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
