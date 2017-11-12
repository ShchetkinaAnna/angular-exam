import { TestBed, async, inject } from '@angular/core/testing';

import { SaveFormGuard } from './save-form.guard';

describe('SaveFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveFormGuard]
    });
  });

  it('should ...', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
