import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercardComponent } from './usercard.component';
import { UsersexPipe } from '../usersex.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { TUserCard } from '../../../comon';

describe('UsercardComponent', () => {
  let component: UsercardComponent;
  let fixture: ComponentFixture<UsercardComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let spyRouter: jasmine.Spy;

  let arrayUsers: TUserCard[] =[{
    UserID : 5,
    BirthDate : Date.parse("1975-03-25"),
    F: 'Петров',
    I: 'Максим',
    O: 'Борисович',
    Sex: 0,
    Email: 'testmail5@test.ru'
  }, {
    UserID : 5,
    BirthDate : Date.parse("1975-03-25"),
    F: 'Петров',
    I: 'Максим',
    O: 'Борисович',
    Sex: 0,
    Email: 'testmail5@test.ru',
    Checked: null
  }, {
    UserID : 5,
    BirthDate : Date.parse("1975-03-25"),
    F: 'Петров',
    I: 'Максим',
    O: 'Борисович',
    Sex: 0,
    Email: 'testmail5@test.ru',
    Checked: undefined
  }, {
    UserID : 5,
    BirthDate : Date.parse("1975-03-25"),
    F: 'Петров',
    I: 'Максим',
    O: 'Борисович',
    Sex: 0,
    Email: 'testmail5@test.ru',
    Checked: false
  }, {
    UserID : 5,
    BirthDate : Date.parse("1975-03-25"),
    F: 'Петров',
    I: 'Максим',
    O: 'Борисович',
    Sex: 0,
    Email: 'testmail5@test.ru',
    Checked: true
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UsercardComponent, 
        UsersexPipe 
      ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercardComponent);
    component = fixture.componentInstance;

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');
    route = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should goToCard', () => {
    component.goToCard(5);
    expect(spyRouter).toHaveBeenCalledWith([5], {relativeTo: route});
  }); 

  it('should clickOnCheckDelete', () => {
    let spyComponentUserEmit = spyOn(component.userSelected, 'emit');
    arrayUsers.forEach((mockUser) => {
      component.user = mockUser;
      component.clickOnCheckDelete(null);
      expect(spyComponentUserEmit).toHaveBeenCalledWith(mockUser);    
    });
  });

  it('should checkElement', () => {
    let spyComponentOnCheck = spyOn(component, 'clickOnCheckDelete');
    arrayUsers.forEach((mockUser) => {
      let etVal = mockUser.Checked;
      component.user = mockUser;
      expect(component.user.Checked).toBe(etVal);
      component.checkElement(null);
      expect(component.user.Checked).toBe(!etVal);     
      expect(spyComponentOnCheck).toHaveBeenCalled();    
    });
  });
});
