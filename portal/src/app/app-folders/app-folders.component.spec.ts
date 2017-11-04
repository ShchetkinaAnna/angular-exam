import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFoldersComponent } from './app-folders.component';

describe('AppFoldersComponent', () => {
  let component: AppFoldersComponent;
  let fixture: ComponentFixture<AppFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
