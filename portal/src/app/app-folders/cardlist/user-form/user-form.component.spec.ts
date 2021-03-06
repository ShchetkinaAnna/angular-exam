import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { UserproviderService } from '../userprovider.service';
import { API_URL } from '../../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../../mail-box/mailservice.service';
import { CustomsexComponent } from '../customsex/customsex.component';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { TUserCard } from '../../../comon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let spyRouter: jasmine.Spy;
  let mailService: MailserviceService;
  let spyMailService: jasmine.Spy;
  let userService: UserproviderService;
  let spyUserServiceAdd: jasmine.Spy;
  let spyUserServiceEdit: jasmine.Spy;
  let dPipe: DatePipe;

  let mockUser: { user: TUserCard };
  let mockNullUser: { user: TUserCard }; 
  let mockFormUser;
  let mockFormNullUser;  
  let mockFormAddUser;
  let mockFormChangeUser;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent, CustomsexComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ UserproviderService,
        MailserviceService,
        { provide: API_URL, useValue: '' },
        DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockUser = { user: {
      UserID : 5,
      BirthDate : Date.parse("1975-03-25"),
      F: 'Петров',
      I: 'Максим',
      O: 'Борисович',
      Sex: 0,
      Email: 'testmail5@test.ru'
    }};
  
    mockNullUser = { user: {
      UserID : 32,
      BirthDate : Date.parse(""),
      F: '',
      I: '',
      O: '',
      Sex: -1,
      Email: ''
    }}; 
  
    mockFormUser = { 
      nameControl: '',
      familyControl: '',
      secondNameControl: '',
      userSex: -1,
      bDay: '',
      email: ''
    };
  
    mockFormNullUser = { 
      nameControl: '',
      familyControl: '',
      secondNameControl: '',
      userSex: -1,
      bDay: '',
      email: ''
    };  
  
    mockFormAddUser = { 
      nameControl: '',
      familyControl: '',
      secondNameControl: '',
      userSex: -1,
      bDay: '',
      email: ''
    };
  
    mockFormChangeUser = { 
      nameControl: 'Петров',
      familyControl: 'Иван',
      secondNameControl: 'Иванович',
      userSex: 0,
      bDay: Date.parse("1982-02-16"),
      email: 'hghf@mail.ru'
    };

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    route = fixture.debugElement.injector.get(ActivatedRoute);

    mailService = fixture.debugElement.injector.get(MailserviceService);
    spyMailService = spyOn(mailService, 'setShortUserList');

    userService = fixture.debugElement.injector.get(UserproviderService);
    spyUserServiceAdd = spyOn(userService, 'addUser').and.returnValue(Observable.of(""));
    spyUserServiceEdit = spyOn(userService, 'editUser').and.returnValue(Observable.of(""));
    
    dPipe = fixture.debugElement.injector.get(DatePipe);
    mockFormUser.nameControl = mockUser.user.I;
    mockFormUser.familyControl = mockUser.user.F;
    mockFormUser.secondNameControl = mockUser.user.O;
    mockFormUser.userSex = mockUser.user.Sex;
    mockFormUser.email = mockUser.user.Email;
    mockFormUser.bDay = dPipe.transform(mockUser.user.BirthDate, 'yyyy-MM-dd');

    mockFormNullUser.nameControl = mockNullUser.user.I;
    mockFormNullUser.familyControl = mockNullUser.user.F;
    mockFormNullUser.secondNameControl = mockNullUser.user.O;
    mockFormNullUser.userSex = mockNullUser.user.Sex;
    mockFormNullUser.email = mockNullUser.user.Email;
    mockFormNullUser.bDay = fixture.debugElement.injector.get(DatePipe).transform(mockNullUser.user.BirthDate, 'yyyy-MM-dd');

    mockFormAddUser.bDay = component.etYears.toISOString().substring(0,10);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    let year = new Date();
    year.setFullYear(year.getFullYear() - 18);
    expect(component.etYears.getFullYear()).toBe(year.getFullYear());
    expect(component.etYears.getMonth()).toBe(year.getMonth());
    expect(component.etYears.getDate()).toBe(year.getDate());
  });

  it('should ngOnInit was subscribe', () => {
    component.routerDataSubscribe = null;
    component.ngOnInit();
    expect(component.routerDataSubscribe).toBeDefined();
    expect(component.routerDataSubscribe instanceof Subscription).toBeTruthy();
  });  

  it('should ngOnInit when get id', () => {    
    route.snapshot.params["id"] = mockUser.user.UserID;
    route.data = Observable.of(mockUser);
    component.fullControls = null;
    component.formChangeSubscribe = null;
    component.ngOnInit();   
    expect(component.userId).toBe(mockUser.user.UserID);
    expect(component.fullControls).toBeDefined();
    expect(component.fullControls instanceof FormGroup).toBeTruthy();
    expect(component.fullControls.value).toEqual(mockFormUser);   
    expect(component.formChangeSubscribe).toBeDefined();
    expect(component.formChangeSubscribe instanceof Subscription).toBeTruthy(); 
    expect(component.canDeactivateVal).toBe(true);
    component.fullControls.setValue(mockFormChangeUser);
    expect(component.canDeactivateVal).toBe(false);
  });  

  it('should ngOnInit when get id with null save', () => {
    route.snapshot.params["id"] = mockNullUser.user.UserID;
    route.data = Observable.of(mockNullUser);
    component.fullControls = null;
    component.formChangeSubscribe = null;
    component.ngOnInit();   
    expect(component.userId).toBe(mockNullUser.user.UserID);
    expect(component.fullControls).toBeDefined();
    expect(component.fullControls instanceof FormGroup).toBeTruthy();
    expect(component.fullControls.value).toEqual(mockFormNullUser);   
    expect(component.formChangeSubscribe).toBeDefined();
    expect(component.formChangeSubscribe instanceof Subscription).toBeTruthy(); 
    expect(component.canDeactivateVal).toBe(true);
    component.fullControls.setValue(mockFormChangeUser);
    expect(component.canDeactivateVal).toBe(false);
  });

  it('should ngOnInit when not id', () => {
    component.fullControls = null;
    component.formChangeSubscribe = null;
    component.ngOnInit();   
    expect(component.userId).toBe(-1);
    expect(component.fullControls).toBeDefined();
    expect(component.fullControls instanceof FormGroup).toBeTruthy();
    expect(component.fullControls.value).toEqual(mockFormAddUser); 
    expect(component.formChangeSubscribe).toBeDefined();
    expect(component.formChangeSubscribe instanceof Subscription).toBeTruthy();    
    expect(component.canDeactivateVal).toBe(true);
    component.fullControls.setValue(mockFormChangeUser);
    expect(component.canDeactivateVal).toBe(false);
  });    

  it('should ngOnDestroy', () => {
    expect(component.formChangeSubscribe.closed).toBe(false);
    expect(component.routerDataSubscribe.closed).toBe(false);
    component.ngOnDestroy();
    expect(component.formChangeSubscribe.closed).toBe(true);
    expect(component.routerDataSubscribe.closed).toBe(true);
  });  

  it('should moveToParent', () => {
    component.moveToParent();
    expect(spyRouter).toHaveBeenCalledWith(['/client/users']);
  });  

  it('should afterSave', () => {
    component.canDeactivateVal = false;
    component.afterSave();
    expect(spyMailService).toHaveBeenCalledWith(null);
    expect(component.canDeactivateVal).toBe(true);
    expect(spyRouter).toHaveBeenCalledWith(["../"], {relativeTo: route});
  });  

  it('should addUser with -1', () => {
    let spyComponentAfterSave = spyOn(component, 'afterSave');
    component.userId = -1;
    component.fullControls.setValue(mockFormChangeUser);
    component.addUser();
    expect(spyUserServiceAdd.calls.count()).toBe(1);
    expect(spyUserServiceAdd).toHaveBeenCalledWith(mockFormChangeUser);
    expect(spyComponentAfterSave.calls.count()).toBe(1);
  });  

  it('should addUser with params', () => {
    let spyComponentAfterSave = spyOn(component, 'afterSave');
    component.userId = mockUser.user.UserID;
    component.fullControls.setValue(mockFormChangeUser);
    component.addUser();
    expect(spyUserServiceEdit.calls.count()).toBe(1);
    expect(spyUserServiceEdit).toHaveBeenCalledWith(mockUser.user.UserID, mockFormChangeUser);
    expect(spyComponentAfterSave.calls.count()).toBe(1);
  });  

  it('should getClassByStatus', () => {
    expect(component.getClassByStatus("INVALIDfghgf")).toBe("");
    expect(component.getClassByStatus("INVALID")).toBe("invalidInput");
    expect(component.getClassByStatus("inVALID")).toBe("");
    expect(component.getClassByStatus("")).toBe("");
    expect(component.getClassByStatus(null)).toBe("");
    expect(component.getClassByStatus(undefined)).toBe("");
  });  

  it('should canDeactivate', () => {
    component.canDeactivateVal = false;
    expect(component.canDeactivate()).toBe(false);
    component.canDeactivateVal = true;
    expect(component.canDeactivate()).toBe(true);
  });  

  it('should validateSex', () => {
    let vFunc = component.validateSex();
    expect(typeof vFunc).toBe("function");

    let fControl = new FormControl(null, []);
    expect(vFunc(fControl)).toBe(null);

    let fControl1 = new FormControl(undefined, []);
    expect(vFunc(fControl1)).toBe(null);

    let fControl2 = new FormControl("werwer", []);
    expect(vFunc(fControl2)).toBe(null);

    let fControl3 = new FormControl(-1, []);
    let etResObj = {validateSex: {message: 'Укажите пол'}};
    expect(vFunc(fControl3)).toEqual(etResObj);
  }); 

  it('should validateBD', () => {
    let vFunc = component.validateBD(component.etYears);
    expect(typeof vFunc).toBe("function");
    let etResObj = {validateBD: {message: 'Ещё нет 18 лет'}};

    let fControl = new FormControl(null, []);
    expect(vFunc(fControl)).toEqual(etResObj);

    let fControl1 = new FormControl(undefined, []);
    expect(vFunc(fControl1)).toEqual(etResObj);
    
    let fControl2 = new FormControl("", []);
    expect(vFunc(fControl2)).toEqual(etResObj);        

    let d = new Date();
    var year = d.getFullYear() - component.minYears;
    d.setFullYear(year);

    let dp = new Date();
    dp.setFullYear(year);
    dp.setDate(dp.getDate() - 1);

    let dn = new Date();
    dn.setFullYear(year);
    dn.setDate(dn.getDate() + 1);  
    
    let fControl5 = new FormControl(dPipe.transform(dp, 'yyyy-MM-dd'), []);
    expect(vFunc(fControl5)).toEqual(null);

    let fControl4 = new FormControl(dPipe.transform(d, 'yyyy-MM-dd'), []);
    expect(vFunc(fControl4)).toEqual(null);

    let fControl3 = new FormControl(dPipe.transform(dn, 'yyyy-MM-dd'), []);    
    expect(vFunc(fControl3)).toEqual(etResObj);
  }); 
});