import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsexComponent } from './customsex.component';

describe('CustomsexComponent', () => {
  let component: CustomsexComponent;
  let fixture: ComponentFixture<CustomsexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomsexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
