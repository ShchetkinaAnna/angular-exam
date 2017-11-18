import { TestBed, inject } from '@angular/core/testing';

import { UserDataResolveService } from './user-data-resolve.service';

describe('UserDataResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataResolveService]
    });
  });

  it('should be created', inject([UserDataResolveService], (service: UserDataResolveService) => {
    expect(service).toBeTruthy();
  }));
});
