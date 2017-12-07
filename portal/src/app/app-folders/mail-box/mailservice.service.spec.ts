import { TestBed, inject } from '@angular/core/testing';

import { MailserviceService } from './mailservice.service';
import { API_URL } from '../../auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserproviderService } from '../cardlist/userprovider.service';
import { Subject } from 'rxjs/Subject';
import { TShortUserList } from '../../comon';
import { Observable } from 'rxjs/Observable';

describe('MailserviceService', () => {
  let mockUserList: Array<TShortUserList>;
  let mockUserList1: Array<TShortUserList>;
  let mockUserListBack: any;

  beforeEach(() => {
    mockUserList = [{Id: 2, Value: "Шапиро Александр Ильич <testmail2@test.ru>"},{Id: 3, Value: "Ватутин Михаил Олегович <testmail3@test.ru>"}];
    mockUserList1 = [{Id: 2, Value: "Шапиро Александр Ильич <testmail2@test.ru>"},{Id: 3, Value: "Ватутин Михаил Олегович <testmail3@test.ru>"},{Id: 4, Value: "Киселев Роман Борисович <testmail4@test.ru>"}];
    mockUserListBack = { UserList: [
      {
        Id:2, 
        BD: "1973-12-01",
        F: "Шапиро",
        I: "Александр",
        O: "Ильич",
        Sex: 0,
        Email: "testmail2@test.ru"
      },
      {
        Id:3, 
        BD: "1984-01-08",
        F: "Ватутин",
        I: "Михаил",
        O: "Олегович",
        Sex: 0,
        Email: "testmail3@test.ru"
      },
      {
        Id:20, 
        BD: "1963-02-06",
        F: "Молчанова",
        I: "Лариса",
        O: "Викторовна",
        Sex: 1,
        Email: "testmail20@test.ru"
      }
    ]};

    TestBed.configureTestingModule({
      providers: [
        MailserviceService, 
        { provide: API_URL, useValue: '' },
        UserproviderService
      ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([MailserviceService], (service: MailserviceService) => {
    expect(service).toBeTruthy();
    expect(service.USER_CONTROLLER_URL).toBe("TestUserController/");
    expect(service._changeCountMessages).toBeDefined();
    expect(service._changeCountMessages instanceof Subject).toBeTruthy();
  }));

  it('should be getChangeCountMessagesObs', inject([MailserviceService], (service: MailserviceService) => {
    let bool: boolean = true;
    service.getChangeCountMessagesObs().subscribe(
      (item) => { expect(item).toBe(bool); }
    );
    service._changeCountMessages.next(bool);
    bool = false;
    service._changeCountMessages.next(bool);
  }));  

  it('should be changeCountMessageFlag', inject([MailserviceService], (service: MailserviceService) => {
    let bool: boolean = true;    
    service._changeCountMessages.asObservable().subscribe(
      (item) => { expect(item).toBe(bool); }
    );    
    service.changeCountMessageFlag(bool);
    bool = false;
    service.changeCountMessageFlag(bool);
  })); 

  it('should be getShortUserList', inject([MailserviceService], (service: MailserviceService) => {
    let userList: Array<TShortUserList> = mockUserList;
    service._shortUserList.next(userList);
    service.getShortUserList().subscribe(
      (item) => { expect(item).toEqual(userList); }
    );    
    userList = mockUserList1;
    service._shortUserList.next(userList);
  })); 

  it('should be setShortUserList', inject([MailserviceService], (service: MailserviceService) => {
    let userList: Array<TShortUserList> = mockUserList;
    service.setShortUserList(userList);
    service._shortUserList.asObservable().subscribe(
      (item) => { expect(item).toEqual(userList); }
    );    
    userList = mockUserList1;
    service.setShortUserList(userList);
  })); 

  it('should be updateShortUserList', inject([MailserviceService], (service: MailserviceService) => {
    let userProviderService = service._userproviderService; 
    let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUsers').and.returnValue(Observable.of(mockUserListBack));

    service.updateShortUserList();
    expect(spyUserproviderService.calls.count()).toBe(1);
  }));  

  /*
  it('should be updateShortUserList', inject([MailserviceService, HttpTestingController], (service: MailserviceService, backend: HttpTestingController) => {
    let userProviderService = service._userproviderService; 
    let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUsers').and.returnValue(Observable.of([]));

    service.updateShortUserList();
    expect(spyUserproviderService.calls.count()).toBe(1);
  }));  */
});



