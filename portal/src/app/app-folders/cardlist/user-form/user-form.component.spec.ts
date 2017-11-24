import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserproviderService } from '../userprovider.service';
import { API_URL } from '../../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../../mail-box/mailservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomsexComponent } from '../customsex/customsex.component';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { TUserCard } from '../../../comon';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let spyRouter: jasmine.Spy;

  let mockUser: { user: TUserCard } = { user: {
    UserID : 5,
    BirthDate : Date.parse("1975-03-25"),
    F: 'Петров',
    I: 'Максим',
    O: 'Борисович',
    Sex: 0,
    Email: 'testmail5@test.ru'
  }};

  let mockFormUser = { 
    nameControl: '',
    familyControl: '',
    secondNameControl: '',
    userSex: -1,
    bDay: '',
    email: ''
  };

  let mockFormAddUser = { 
    nameControl: '',
    familyControl: '',
    secondNameControl: '',
    userSex: -1,
    bDay: '',
    email: ''
  };

  let mockFormChangeUser = { 
    nameControl: 'Петров',
    familyControl: '',
    secondNameControl: '',
    userSex: -1,
    bDay: '',
    email: ''
  };

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
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    route = fixture.debugElement.injector.get(ActivatedRoute);

    mockFormUser.nameControl = mockUser.user.I;
    mockFormUser.familyControl = mockUser.user.F;
    mockFormUser.secondNameControl = mockUser.user.O;
    mockFormUser.userSex = mockUser.user.Sex;
    mockFormUser.email = mockUser.user.Email;
    mockFormUser.bDay = fixture.debugElement.injector.get(DatePipe).transform(mockUser.user.BirthDate, 'yyyy-MM-dd');
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

  it('should moveToParent', () => {
    component.moveToParent();
    expect(spyRouter).toHaveBeenCalledWith(['/client/users']);
  });  
});