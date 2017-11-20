import { TestBed, inject } from '@angular/core/testing';

import { MailserviceService } from './mailservice.service';
import { API_URL } from '../../auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserproviderService } from '../cardlist/userprovider.service';

describe('MailserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MailserviceService, 
        { provide: API_URL, useValue: '' },
        UserproviderService
      ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([MailserviceService, HttpTestingController], (service: MailserviceService, backend: HttpTestingController) => {
    expect(service).toBeTruthy();
  }));
});



