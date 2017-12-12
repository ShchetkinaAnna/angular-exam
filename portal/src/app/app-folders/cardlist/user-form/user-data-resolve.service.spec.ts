import { TestBed, inject } from '@angular/core/testing';

import { UserDataResolveService } from './user-data-resolve.service';
import { UserproviderService } from '../userprovider.service';
import { API_URL } from '../../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'testDummy',
  template: ''
})
class TestDummy {}

describe('UserDataResolveService', () => {
  let mockUserFromServer = {F:"Голов",I:"Павел",O:"Владимирович",Sex:0,Email:"testmail7@test.ru",Id:7,BD:"1977-04-14"};
  let mockUserResult = {F:"Голов",I:"Павел",O:"Владимирович",Sex:0,Email:"testmail7@test.ru",UserID:7,BirthDate:Date.parse("1977-04-14")};
  let mockActivatedRouteSnapshot = {paramMap: {get: function() {return 7;}}};

  let mockUserNullFromServer = {F:"",I:"",O:"",Sex:-1,Email:"tetsg@gamial.com",Id:32,BD:""};
  let mockUserNullResult = {F:"",I:"",O:"",Sex:-1,Email:"tetsg@gamial.com",UserID:32,BirthDate:Date.parse("")};
  let mockNullActivatedRouteSnapshot = {paramMap: {get: function() {return 32;}}};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDummy],
      providers: [
        UserDataResolveService,
        UserproviderService,
        { provide: API_URL, useValue: '' }
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'client/users', component: TestDummy}
    ]), HttpClientTestingModule ]
    });
  });

  it('should be created', inject([UserDataResolveService], (service: UserDataResolveService) => {
    expect(service).toBeTruthy();
  }));

  it('should be resolve', inject([UserDataResolveService], 
    (service: UserDataResolveService) => {
      let userProviderService = service._userproviderService; 
      let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUserById').and.returnValue(Observable.of(mockUserFromServer));
      service.resolve(<any>mockActivatedRouteSnapshot, null).subscribe((data: any) => {
        expect(data).toEqual(mockUserResult);
      });      
      expect(spyUserproviderService.calls.count()).toBe(1);
      expect(spyUserproviderService).toHaveBeenCalledWith(7);
  }));  

  it('should be resolve with null', inject([UserDataResolveService], 
    (service: UserDataResolveService) => {
      let userProviderService = service._userproviderService; 
      let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUserById').and.returnValue(Observable.of(mockUserNullFromServer));
      service.resolve(<any>mockNullActivatedRouteSnapshot, null).subscribe((data: any) => {
        expect(data).toEqual(mockUserNullResult);
      });      
      expect(spyUserproviderService.calls.count()).toBe(1);
      expect(spyUserproviderService).toHaveBeenCalledWith(32);
  })); 

  it('should be resolve throw', inject([UserDataResolveService], 
    (service: UserDataResolveService) => {
      let router: Router = service.router;
      let spyRouter: jasmine.Spy = spyOn(router, 'navigate');

      let userProviderService = service._userproviderService; 
      let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUserById').and.returnValue(Observable.throw(new Error()));
      service.resolve(<any>mockNullActivatedRouteSnapshot, null).subscribe((data: any) => {
        expect(data).toEqual(null);
        expect(spyRouter).toHaveBeenCalledWith(['/client/users']);
      });           
      expect(spyUserproviderService.calls.count()).toBe(1);
      expect(spyUserproviderService).toHaveBeenCalledWith(32);
  }));
});
