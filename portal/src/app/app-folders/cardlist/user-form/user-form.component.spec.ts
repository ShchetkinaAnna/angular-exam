import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserproviderService } from '../userprovider.service';
import { API_URL } from '../../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../../mail-box/mailservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomsexComponent } from '../customsex/customsex.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let spyRouter: jasmine.Spy;
  //let spyRoute: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent, CustomsexComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ UserproviderService,
        MailserviceService,
        { provide: API_URL, useValue: '' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    route = fixture.debugElement.injector.get(ActivatedRoute);
    /*spyRoute = spyOn(route.data, 'subscribe');*/

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

  it('should moveToParent', () => {
    component.moveToParent();
    expect(spyRouter).toHaveBeenCalledWith(['/client/users']);
  });

  it('should ngOnInit was subscribe', () => {
    component.routerDataSubscribe = null;
    component.ngOnInit();
    expect(component.routerDataSubscribe).toBeDefined();
    expect(component.routerDataSubscribe instanceof Subscription).toBeTruthy();
  });  
});