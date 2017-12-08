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
  let mockUserListBack1: any;

  beforeEach(() => {
    mockUserList = [{Id: 2, Value: "Шапиро Александр Ильич <testmail2@test.ru>"},{Id: 3, Value: "Ватутин Михаил Олегович <testmail3@test.ru>"}];
    mockUserList1 = [{Id: 2, Value: "Шапиро Александр Ильич <testmail2@test.ru>"},{Id: 3, Value: "Ватутин Михаил Олегович <testmail3@test.ru>"},{Id: 4, Value: "Киселев Роман Борисович <testmail4@test.ru>"}];
    mockUserListBack1 = { UserList: [
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
      }
    ]};
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
        Id:4, 
        BD: "1963-02-06",
        F: "Киселев",
        I: "Роман",
        O: "Борисович",
        Sex: 1,
        Email: "testmail4@test.ru"
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
    let etUserList = mockUserList1;
    let userProviderService = service._userproviderService; 
    let spyUserproviderService: jasmine.Spy = spyOn(userProviderService, 'getUsers').and.returnValue(Observable.of(mockUserListBack));

    service.updateShortUserList();
    expect(spyUserproviderService.calls.count()).toBe(1);

    service.getShortUserList().subscribe(
      (item) => { expect(item).toEqual(etUserList); }
    );    

    etUserList = mockUserList;
    spyUserproviderService.and.returnValue(Observable.of(mockUserListBack1));
    service.updateShortUserList();
  }));  

  it('should be getUsers', inject([MailserviceService, HttpTestingController], (service: MailserviceService, backend: HttpTestingController) => {
    let mockFolders = [{Id:"inbox",Name:"Входящие (4)"},{Id:"sent",Name:"Отправленные (2)"},{Id:"trashbin",Name:"Удаленные (1)"}];

    service.getFolders().subscribe(
      users => { expect(users).toEqual(mockFolders); }
    );

    backend.expectOne({
      method: "GET",
      url: "TestUserController/GetFolders"
    }).flush(mockFolders);

    backend.verify();
  })); 

  it('should be getMessages', inject([MailserviceService, HttpTestingController], (service: MailserviceService, backend: HttpTestingController) => {
    let mockMessagesInFolder = [{Id:"7",Subject:"RE:Это еще одно письмо",Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",InDate:"2017-10-11 13:14:55",User:{F:"Шапиро",I:"Александр",O:"Ильич",Email:"testmail2@test.ru",Id:2}},
    {Id:"6",Subject:"RE:Это первое письмо",Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",InDate:"2017-04-18 18:19:20",User:{F:"Синицын",I:"Юрий",O:"Николаевич",Email:"testmail6@test.ru",Id:6}}];

    service.getMessages("inbox").subscribe(
      users => { expect(users).toEqual(mockMessagesInFolder); }
    );

    backend.expectOne({
      method: "GET",
      url: "TestUserController/GetMessages/inbox"
    }).flush(mockMessagesInFolder);

    backend.verify();
  })); 
  
  it('should be deleteMails', inject([MailserviceService, HttpTestingController], (service: MailserviceService, backend: HttpTestingController) => {
    service.deleteMails("3|1").subscribe(
      users => { expect(users).toBe("_"); }
    );

    let req = backend.expectOne({
      method: "POST",
      url: "TestUserController/DeleteMails"
    });
    
    expect(req.request.body).toEqual({ mailsIds: "3|1" });
    expect(req.request.responseType).toEqual('text');

    req.flush("_");

    backend.verify();
  })); 

  it('should be getMessage', inject([MailserviceService, HttpTestingController], (service: MailserviceService, backend: HttpTestingController) => {
    let mockMessage = {Id:7,Subject:"RE:Это еще одно письмо",Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",InDate:"2017-10-11 13:14:55",User:{F:"Шапиро",I:"Александр",O:"Ильич",Email:"testmail2@test.ru",Id:2}};

    service.getMessage(7).subscribe(
      users => { expect(users).toEqual(mockMessage); }
    );

    backend.expectOne({
      method: "GET",
      url: "TestUserController/GetMessageById/7"
    }).flush(mockMessage);

    backend.verify();
  })); 
});



