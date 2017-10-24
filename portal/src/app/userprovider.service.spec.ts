import { TestBed, inject } from '@angular/core/testing';

import { UserproviderService } from './userprovider.service';

describe('UserproviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserproviderService]
    });
  });

  it('should be created', inject([UserproviderService], (service: UserproviderService) => {
    expect(service).toBeTruthy();
  }));
});
