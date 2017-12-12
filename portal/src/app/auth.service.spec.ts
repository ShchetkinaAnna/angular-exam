import { TestBed, inject } from '@angular/core/testing';

import { AuthService, API_URL } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'testDummy',
  template: ''
})
class TestDummy {}

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.setItem('login', 'admin');

    TestBed.configureTestingModule({
      declarations: [TestDummy],
      providers: [AuthService,
        { provide: API_URL, useValue: '' }],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'client', component: TestDummy }
    ]) ]
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

  it('should be authorization correct', inject([AuthService, HttpTestingController], (service: AuthService, backend: HttpTestingController) => {
    service.login = "admin2";
    localStorage.setItem('token', "11");
    localStorage.setItem('login', "admin2");
    let router: Router = service.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigate');

    service.authorization("admin", "passw");
    expect(service.login).toBe("admin");

    let req = backend.expectOne({
      method: "POST",
      url: "AuthController/Auth"
    });    
    expect(req.request.body).toEqual({ login: "admin", password: "passw" });

    req.flush({
      Token: "dfgdgfd",
      Error: ""
    });

    backend.verify();

    expect(localStorage.getItem('token')).toBe("dfgdgfd");
    expect(localStorage.getItem('login')).toBe("admin");
    expect(spyRouter).toHaveBeenCalledWith(['/client']);
  }));

  it('should be authorization error from server', inject([AuthService, HttpTestingController], (service: AuthService, backend: HttpTestingController) => {
    service.login = "admin2";
    localStorage.setItem('token', "11");
    localStorage.setItem('login', "admin2");
    let router: Router = service.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigate');
    let spyOnAlert = spyOn(window, "alert");

    service.authorization("admin", "passw");
    expect(service.login).toBe("admin");

    let req = backend.expectOne({
      method: "POST",
      url: "AuthController/Auth"
    });    
    expect(req.request.body).toEqual({ login: "admin", password: "passw" });

    req.flush({
      Token: null,
      Error: "Произошла ошибка"
    });

    backend.verify();

    expect(localStorage.getItem('token')).toBe("11");
    expect(localStorage.getItem('login')).toBe("admin2");
    expect(spyRouter).not.toHaveBeenCalled();
    expect(spyOnAlert).toHaveBeenCalledWith("Произошла ошибка");
  }));

  it('should be authorization fatal error', inject([AuthService, HttpTestingController], (service: AuthService, backend: HttpTestingController) => {
    service.login = "admin2";
    localStorage.setItem('token', "11");
    localStorage.setItem('login', "admin2");
    let router: Router = service.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigate');
    let spyOnAlert = spyOn(window, "alert");
    let spyOnHandleError = spyOn(service, "handleError");

    service.authorization("admin", "passw");
    expect(service.login).toBe("admin");

    let req = backend.expectOne({
      method: "POST",
      url: "AuthController/Auth"
    });    
    expect(req.request.body).toEqual({ login: "admin", password: "passw" });

    req.error(new ErrorEvent('error'));

    backend.verify();

    expect(localStorage.getItem('token')).toBe("11");
    expect(localStorage.getItem('login')).toBe("admin2");
    expect(spyRouter).not.toHaveBeenCalled();
    expect(spyOnAlert).not.toHaveBeenCalled();
    expect(spyOnHandleError).toHaveBeenCalled();
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