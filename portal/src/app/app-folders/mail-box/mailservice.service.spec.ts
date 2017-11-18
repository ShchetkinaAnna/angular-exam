import { TestBed, inject } from '@angular/core/testing';

import { MailserviceService } from './mailservice.service';

describe('MailserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailserviceService]
    });
  });

  it('should be created', inject([MailserviceService], (service: MailserviceService) => {
    expect(service).toBeTruthy();
  }));
});
