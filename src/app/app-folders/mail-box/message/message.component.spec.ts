import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../mailservice.service';
import { API_URL } from '../../../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserproviderService } from '../../cardlist/userprovider.service';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MailserviceService,
        { provide: API_URL, useValue: '' }, 
        UserproviderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
