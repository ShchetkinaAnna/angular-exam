import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserproviderService } from './userprovider.service';
import { API_URL } from '../../auth.service';

describe('UserproviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserproviderService,
        { provide: API_URL, useValue: '' }],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([UserproviderService], (service: UserproviderService) => {
    expect(service).toBeTruthy();
    expect(service.USER_CONTROLLER_URL).toBe("TestUserController/");
  }));

  it('should be getUsers', inject([UserproviderService, HttpTestingController], (service: UserproviderService, backend: HttpTestingController) => {
    let mockUserList = { UserList: [
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

    service.getUsers().subscribe(
      users => { expect(users).toEqual(mockUserList); }
    );

    backend.expectOne({
      method: "GET",
      url: "TestUserController/GetUsers"
    }).flush(mockUserList);

    backend.verify();
  }));  

  it('should be getUserById', inject([UserproviderService, HttpTestingController], (service: UserproviderService, backend: HttpTestingController) => {
    let mockUser = {
      Id: 32, 
      BD: "1963-02-06",
      F: "Молчанова",
      I: "Лариса",
      O: "Викторовна",
      Sex: 1,
      Email: "testmail20@test.ru"
    };

    service.getUserById("32").subscribe(
      users => { expect(users).toEqual(mockUser); }
    );

    backend.expectOne({
      method: "GET",
      url: "TestUserController/GetUserById/32"
    }).flush(mockUser);

    backend.verify();
  }));  

  it('should be deleteUsers', inject([UserproviderService, HttpTestingController], (service: UserproviderService, backend: HttpTestingController) => {
    service.deleteUsers("32|15").subscribe(
      users => { expect(users).toBe("_"); }
    );

    let req = backend.expectOne({
      method: "POST",
      url: "TestUserController/DeleteUsers"
    });
    
    expect(req.request.body).toEqual({ userIds: "32|15" });
    expect(req.request.responseType).toEqual('text');

    req.flush("_");

    backend.verify();
  })); 

  it('should be addUser', inject([UserproviderService, HttpTestingController], (service: UserproviderService, backend: HttpTestingController) => {
    let mockAddUser = {nameControl:"Имя",familyControl:"Фамилия",secondNameControl:"Отчество",userSex:1,bDay:"1999-07-07",email:"fgfdg@mail.ru"};

    service.addUser(mockAddUser).subscribe(
      users => { expect(users).toBe("_"); }
    );

    let req = backend.expectOne({
      method: "POST",
      url: "TestUserController/AddUser"
    });
    
    expect(req.request.body).toEqual(mockAddUser);
    expect(req.request.responseType).toEqual('text');

    req.flush("_");

    backend.verify();
  })); 

  it('should be editUser', inject([UserproviderService, HttpTestingController], (service: UserproviderService, backend: HttpTestingController) => {
    let mockEditUser = {nameControl:"Имя1",familyControl:"Фамилия",secondNameControl:"Отчество",userSex:1,bDay:"1999-07-07",email:"fgfdg@mail.ru"};
    let mockEditUserBody = {nameControl:"Имя1",familyControl:"Фамилия",secondNameControl:"Отчество",userSex:1,bDay:"1999-07-07",email:"fgfdg@mail.ru",id:32};

    service.editUser(32, mockEditUser).subscribe(
      users => { expect(users).toBe("_"); }
    );

    let req = backend.expectOne({
      method: "POST",
      url: "TestUserController/EditUser"
    });
    
    expect(req.request.body).toEqual(mockEditUserBody);
    expect(req.request.responseType).toEqual('text');

    req.flush("_");

    backend.verify();
  })); 
});
