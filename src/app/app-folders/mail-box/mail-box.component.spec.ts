import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailBoxComponent } from './mail-box.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from './mailservice.service';
import { API_URL } from '../../auth.service';
import { UserproviderService } from '../cardlist/userprovider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MailBoxComponent', () => {
  let component: MailBoxComponent;
  let fixture: ComponentFixture<MailBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailBoxComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MailserviceService,
        { provide: API_URL, useValue: '' },
        UserproviderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
