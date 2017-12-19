import { TestBed, inject } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'testDummy',
  template: ''
})
class TestDummy {}

describe('InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDummy],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      }],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component: TestDummy}
    ]), HttpClientTestingModule ]
    });
  });

  it('should be created', inject([HTTP_INTERCEPTORS], (service: InterceptorService) => {
    expect(service[1]).toBeTruthy();
  }));

  it('should be handleError', inject([HTTP_INTERCEPTORS], (service: InterceptorService) => {
    let err: HttpErrorResponse = new HttpErrorResponse({ error: new Error("ошибка на клиенте") });
    let spyOnConsole = spyOn(console, "log");

    service[1].handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith('An error occurred:', "ошибка на клиенте");

    err = new HttpErrorResponse({status: 500, error: {Message: "ошибка на сервере"}});
    service[1].handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith(`Backend returned code 500, body was:`);
    expect(spyOnConsole).toHaveBeenCalledWith(err.error);
  }));

  it('should be intercept non auth and correct', inject([HTTP_INTERCEPTORS, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {
    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/client').subscribe(response => expect(response).toBeTruthy());

    let request = backend.expectOne(req => (req.headers.has('Authorization') && req.headers.get('Authorization') == ("Basic " + btoa(localStorage.getItem('token')))));    
    request.flush({data: 'test'});
    backend.verify();
  }));

  it('should be intercept auth', inject([HTTP_INTERCEPTORS, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {
    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/Auth').subscribe(response => expect(response).toBeTruthy());

    let request = backend.expectOne(req => (!req.headers.has('Authorization')));    
    request.flush({data: 'test'});
    backend.verify();
  }));  

  it('should be intercept non auth and not correct', inject([HTTP_INTERCEPTORS, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {    
    let spyRouter: jasmine.Spy = spyOn(service[1].router, 'navigate');
    let spyHandleError: jasmine.Spy = spyOn(service[1], 'handleError');

    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/client').subscribe(response => expect(response).toBeTruthy(), (err) => { expect(err.status).toBe(401); expect(err.statusText).toBe("ошибка авторизации"); });
    let request = backend.expectOne(req => (req.headers.has('Authorization') && req.headers.get('Authorization') == ("Basic " + btoa(localStorage.getItem('token')))));    

    request.flush({data: 'test'}, {status: 401, statusText: "ошибка авторизации"});

    backend.verify();
    expect(spyRouter).toHaveBeenCalledWith(["/login"]); 
    expect(spyHandleError).toHaveBeenCalled();       
  }));  

  it('should be intercept non auth and not correct2', inject([HTTP_INTERCEPTORS, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {    
    let spyRouter: jasmine.Spy = spyOn(service[1].router, 'navigate');
    let spyHandleError: jasmine.Spy = spyOn(service[1], 'handleError');

    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/client').subscribe(response => expect(response).toBeTruthy(), (err) => { expect(err.status).toBe(500); expect(err.statusText).toBe("какая-то ошибка"); });
    let request = backend.expectOne(req => (req.headers.has('Authorization') && req.headers.get('Authorization') == ("Basic " + btoa(localStorage.getItem('token')))));    

    request.flush({data: 'test'}, {status: 500, statusText: "какая-то ошибка"});

    backend.verify();
    expect(spyRouter).not.toHaveBeenCalled(); 
    expect(spyHandleError).toHaveBeenCalled();    
  })); 
});
