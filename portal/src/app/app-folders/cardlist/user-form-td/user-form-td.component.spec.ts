import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormTdComponent } from './user-form-td.component';

describe('UserFormTdComponent', () => {
  let component: UserFormTdComponent;
  let fixture: ComponentFixture<UserFormTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
