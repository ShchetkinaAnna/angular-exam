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

class RouterStub {
  events: BehaviorSubject<any>;
}

class MockActivatedRoute{
  get snapshot() {
    return { url: [ {path: 'client', toString: function() { return this.path; }} ], children: [{url: [ { path: 'users', toString: function() { return this.path; }} ], outlet: 'primary'}] };
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

  it('should ngOnInit was subscribe', async(inject([Router, ActivatedRoute], (routerStub, route: MockActivatedRoute) => {
    expect(component.eventSubscribe).toBeDefined();
    expect(component.eventSubscribe instanceof Subscription).toBeTruthy();
	
    component.activeId = 1;
    let homeNav = new NavigationEnd(1, '/client/users', '/client/users');
    routerStub.events.next(homeNav);
    expect(component.activeId).toBe(2);
  }))); 
});
