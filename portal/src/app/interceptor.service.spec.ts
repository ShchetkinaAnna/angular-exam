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
      providers: [InterceptorService, {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      }],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component: TestDummy}
    ]), HttpClientTestingModule ]
    });
  });

  it('should be created', inject([InterceptorService], (service: InterceptorService) => {
    expect(service).toBeTruthy();
  }));

  it('should be handleError', inject([InterceptorService], (service: InterceptorService) => {
    let err: HttpErrorResponse = new HttpErrorResponse({ error: new Error("ошибка на клиенте") });
    let spyOnConsole = spyOn(console, "log");

    service.handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith('An error occurred:', "ошибка на клиенте");

    err = new HttpErrorResponse({status: 500, error: {Message: "ошибка на сервере"}});
    service.handleError(err);
    expect(spyOnConsole).toHaveBeenCalledWith(`Backend returned code 500, body was:`);
    expect(spyOnConsole).toHaveBeenCalledWith(err.error);
  }));

  it('should be intercept non auth and correct', inject([InterceptorService, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {
    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/client').subscribe(response => expect(response).toBeTruthy());

    let request = backend.expectOne(req => (req.headers.has('Authorization') && req.headers.get('Authorization') == ("Basic " + btoa(localStorage.getItem('token')))));    
    request.flush({data: 'test'});
    backend.verify();
  }));

  it('should be intercept auth', inject([InterceptorService, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {
    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/Auth').subscribe(response => expect(response).toBeTruthy());

    let request = backend.expectOne(req => (!req.headers.has('Authorization')));    
    request.flush({data: 'test'});
    backend.verify();
  }));  

  it('should be intercept non auth and not correct', inject([InterceptorService, HttpClient, HttpTestingController], (service: InterceptorService, http: HttpClient, backend: HttpTestingController) => {    
    /*let spyHttpClient: jasmine.Spy = spyOn(http, 'get').and.returnValue(Observable.throw(new HttpErrorResponse({status: 401, error: {Message: "ошибка на сервере"}})));
    let spyRouter: jasmine.Spy = spyOn(service.router, 'navigate');

    localStorage.setItem('token', 'dsfdsfdsfds');
    http.get('/client').subscribe(response => expect(response).toBeTruthy());
    expect(spyRouter).toHaveBeenCalledWith(["/login"]);*/

    //let request = backend.expectOne(req => (req.headers.has('Authorization') && req.headers.get('Authorization') == ("Basic " + btoa(localStorage.getItem('token')))));    
    /*request.flush({data: 'test'});
    backend.verify();*/
  }));  
});
