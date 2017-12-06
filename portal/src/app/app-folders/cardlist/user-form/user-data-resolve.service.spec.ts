import { TestBed, inject } from '@angular/core/testing';

import { UserDataResolveService } from './user-data-resolve.service';
import { UserproviderService } from '../userprovider.service';
import { API_URL } from '../../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('UserDataResolveService', () => {
  let mockUserFromServer = {F:"Голов",I:"Павел",O:"Владимирович",Sex:0,Email:"testmail7@test.ru",Id:7,BD:"1977-04-14"};
  let mockUserResult = {F:"Голов",I:"Павел",O:"Владимирович",Sex:0,Email:"testmail7@test.ru",UserID:7,BirthDate:Date.parse("1977-04-14")};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDataResolveService,
        UserproviderService,
        { provide: API_URL, useValue: '' },
        ActivatedRouteSnapshot
      ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
    });
  });

  it('should be created', inject([UserDataResolveService], (service: UserDataResolveService) => {
    expect(service).toBeTruthy();
  }));

  it('should be resolve', inject([UserDataResolveService, UserproviderService, ActivatedRouteSnapshot, RouterStateSnapshot], 
    (service: UserDataResolveService, userProviderService: UserproviderService, 
      route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUserById').and.returnValue(Observable.of(mockUserFromServer));
  }));  
});
