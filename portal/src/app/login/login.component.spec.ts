import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, API_URL } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockFormLogin: any;
  let authService: AuthService;
  let mockFormLoginChange: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [ AuthService,
        { provide: API_URL, useValue: '' } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    mockFormLogin = { 
      login: '',
      password: ''
    };

    mockFormLoginChange = { 
      login: 'demo',
      password: 'demo'
    };

    authService = fixture.debugElement.injector.get(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getClassByStatus', () => {
    expect(component.getClassByStatus("INVALIDfghgf")).toBe("");
    expect(component.getClassByStatus("INVALID")).toBe("invalidInput");
    expect(component.getClassByStatus("inVALID")).toBe("");
    expect(component.getClassByStatus("")).toBe("");
    expect(component.getClassByStatus(null)).toBe("");
    expect(component.getClassByStatus(undefined)).toBe("");
  }); 

  it('should ngOnInit fullControls subscribe', () => {
    component.fullControls = null;

    component.ngOnInit();   

    expect(component.fullControls).toBeDefined();
    expect(component.fullControls instanceof FormGroup).toBeTruthy();
    expect(component.fullControls.value).toEqual(mockFormLogin);
  });  

  it('should loginClick', () => {
    let spyComponentAuthorization = spyOn(authService, 'authorization');
    component.fullControls.setValue(mockFormLoginChange);
    component.loginClick();
    expect(spyComponentAuthorization.calls.count()).toBe(1);
    expect(spyComponentAuthorization).toHaveBeenCalledWith(mockFormLoginChange.login, mockFormLoginChange.password);
  });
});
