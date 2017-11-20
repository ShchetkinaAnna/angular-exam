import { TestBed, inject } from '@angular/core/testing';

import { UserDataResolveService } from './user-data-resolve.service';
import { UserproviderService } from '../userprovider.service';
import { API_URL } from '../../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDataResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDataResolveService,
        UserproviderService,
        { provide: API_URL, useValue: '' }
      ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
    });
  });

  it('should be created', inject([UserDataResolveService], (service: UserDataResolveService) => {
    expect(service).toBeTruthy();
  }));
});
