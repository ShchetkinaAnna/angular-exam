import { TestBed, inject } from '@angular/core/testing';

import { AuthService, API_URL } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.setItem('login', 'admin');

    TestBed.configureTestingModule({
      providers: [AuthService,
        { provide: API_URL, useValue: '' }],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
    expect(service.USER_CONTROLLER_URL).toBe("AuthController/");
    expect(service.login).toBe('admin');
  }));

  it('should be logout', inject([AuthService], (service: AuthService) => {
    this.login = "admin";
    localStorage.setItem('login', 'admin2');
    localStorage.setItem('token', 'token2');
    let router = service.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigate');

    service.logout();
    expect(service.login).toBe(null);
    expect(localStorage.getItem('login')).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
    expect(spyRouter).toHaveBeenCalledWith(["/login"]);
  }));

  it('should be handleError', inject([AuthService], (service: AuthService) => {
    let err: HttpErrorResponse = new HttpErrorResponse({ error: new Error("ошибка на клиенте") });
    let spyOnConsole = spyOn(console, "log");

    service.handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith('An error occurred:', "ошибка на клиенте");

    err = new HttpErrorResponse({status: 500, error: {Message: "ошибка на сервере"}});
    service.handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith(`Backend returned code 500, body was:`);
    expect(spyOnConsole).toHaveBeenCalledWith(err.error);
  }));
});

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.removeItem('login');

    TestBed.configureTestingModule({
      providers: [AuthService,
        { provide: API_URL, useValue: '' }],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
    expect(service.USER_CONTROLLER_URL).toBe("AuthController/");
    expect(service.login).toBe(null);
  }));
});