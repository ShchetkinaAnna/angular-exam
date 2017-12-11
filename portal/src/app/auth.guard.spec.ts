import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [ RouterTestingModule ]
    });
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should canActivate false', inject([AuthGuard], (guard: AuthGuard) => {
    let router: Router = guard.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigate');

    localStorage.setItem('token', 'sdfdsf');
    expect(guard.canActivate(null, null)).toBe(false);
    expect(spyRouter).toHaveBeenCalledWith(['/client']);
  }));

  it('should canActivate true', inject([AuthGuard], (guard: AuthGuard) => {
    let router: Router = guard.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigate');

    localStorage.removeItem('token');
    expect(guard.canActivate(null, null)).toBe(true);
    expect(spyRouter).not.toHaveBeenCalled();
  }));
});
