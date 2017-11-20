import { TestBed, async, inject } from '@angular/core/testing';

import { SaveFormGuard } from './save-form.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('SaveFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveFormGuard],
      imports: [ RouterTestingModule ]
    });
  });

  it('should ...', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
