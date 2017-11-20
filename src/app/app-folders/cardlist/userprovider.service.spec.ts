import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserproviderService } from './userprovider.service';
import { API_URL } from '../../auth.service';

describe('UserproviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserproviderService,
        { provide: API_URL, useValue: '' }],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([UserproviderService, HttpTestingController], (service: UserproviderService, backend: HttpTestingController) => {
    expect(service).toBeTruthy();
  }));
});
