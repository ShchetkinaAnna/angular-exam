import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFoldersComponent } from './app-folders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, API_URL } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment, NavigationEnd, ActivatedRouteSnapshot, Params, Data, Route, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Type } from '@angular/core';
import { TMenu } from '../comon';

class RouterStub {
  events: BehaviorSubject<any>;
}

class MockActivatedRoute{
  public prop: number = 1;
  get snapshot() {
    if (this.prop == 1) {
      return { url: [ {path: 'client', toString: function() { return this.path; }} ], children: [{url: [ { path: 'users', toString: function() { return this.path; }} ], outlet: 'primary'}] };
    }
    else {
      return { url: [ {path: 'client', toString: function() { return this.path; }} ], children: [{url: [ { path: 'mailbox', toString: function() { return this.path; }} ], outlet: 'primary'}] };
    }    
  }
}

describe('AppFoldersComponent', () => {
  let component: AppFoldersComponent;
  let fixture: ComponentFixture<AppFoldersComponent>;
  let authService: AuthService;
  let router: Router;
  let spyRouter: jasmine.Spy;
  let eventsSub: any;
  let routerStub: RouterStub;
  let mockMenuElements: Array<TMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFoldersComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ AuthService,
        { provide: API_URL, useValue: '' },
        { provide: ActivatedRoute, useClass: MockActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockMenuElements = [
      { Name: "Почта", Id: 1, Link: "/client/mailbox" },
      { Name: "Контакты", Id: 2, Link: "/client/users" }     
    ];

    fixture = TestBed.createComponent(AppFoldersComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthService);

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.eventSubscribe.closed).toBe(true);
  }); 

  it('should LogOut', () => {
    let spyComponentAuthorization = spyOn(authService, 'logout');
    component.LogOut();
    expect(spyComponentAuthorization.calls.count()).toBe(1);
  });

  it('should getUserName', () => {   
    authService.login = "demo1"; 
    expect(component.getUserName()).toBe("demo1");
    authService.login = "demo2"; 
    expect(component.getUserName()).toBe("demo2");
  }); 

  it('should ngOnInit was subscribe and change on Users', async(inject([Router, ActivatedRoute], (routerStub, route: MockActivatedRoute) => {
    expect(component.eventSubscribe).toBeDefined();
    expect(component.eventSubscribe instanceof Subscription).toBeTruthy();
  
    route.prop = 1;
    component.activeId = 1;
    let homeNav = new NavigationEnd(1, '/client/users', '/client/users');
    routerStub.events.next(homeNav);
    expect(component.activeId).toBe(2);
  }))); 

  it('should ngOnInit was subscribe and change on MailBox', async(inject([Router, ActivatedRoute], (routerStub, route: MockActivatedRoute) => {    
    expect(component.eventSubscribe).toBeDefined();
    expect(component.eventSubscribe instanceof Subscription).toBeTruthy();
  
    route.prop = 2;
    component.activeId = 2;
    let homeNav = new NavigationEnd(2, '/client/mailbox', '/client/mailbox');
    routerStub.events.next(homeNav);
    expect(component.activeId).toBe(1);
  })));   

  it('should getActiveName', () => {   
    component.activeId = 2;
    expect(component.getActiveName()).toBe(mockMenuElements[1].Name);
    component.activeId = 1;
    expect(component.getActiveName()).toBe(mockMenuElements[0].Name);
  }); 

  it('should toggleMenu', () => {   
    component.activeMenu = true;
    component.toggleMenu();
    expect(component.activeMenu).toBe(false);
    component.toggleMenu();
    expect(component.activeMenu).toBe(true);
  }); 

  it('should focusOutMenu', () => {   
    component.activeMenu = true;
    component.focusOutMenu();
    expect(component.activeMenu).toBe(false);
    component.focusOutMenu();
    expect(component.activeMenu).toBe(false);
  }); 

  it('should navigateMenu', async(inject([ActivatedRoute], (route: MockActivatedRoute) => {    
    component.activeId = 1;
    let spyComponentOnfocusOutMenu = spyOn(component, 'focusOutMenu');

    component.navigateMenu(mockMenuElements[1].Id, mockMenuElements[1].Link);
    expect(component.activeId).toBe(mockMenuElements[1].Id);
    expect(spyComponentOnfocusOutMenu.calls.count()).toBe(1);
    expect(spyRouter).toHaveBeenCalledWith([mockMenuElements[1].Link], {relativeTo: route});

    component.navigateMenu(mockMenuElements[0].Id, mockMenuElements[0].Link);
    expect(component.activeId).toBe(mockMenuElements[0].Id);
    expect(spyComponentOnfocusOutMenu.calls.count()).toBe(2);
    expect(spyRouter).toHaveBeenCalledWith([mockMenuElements[0].Link], {relativeTo: route});
  })));   
});
