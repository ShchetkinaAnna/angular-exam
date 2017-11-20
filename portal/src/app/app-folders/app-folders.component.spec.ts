import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFoldersComponent } from './app-folders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, API_URL } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppFoldersComponent', () => {
  let component: AppFoldersComponent;
  let fixture: ComponentFixture<AppFoldersComponent>;
  let authService: AuthService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFoldersComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ AuthService,
        { provide: API_URL, useValue: '' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFoldersComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    spy = spyOn(authService, 'logout');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService', () => {
    component.LogOut();
    expect(spy.calls.any()).toBeTruthy();
  });
});
