import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsexComponent } from './customsex.component';
import { TSexValues } from '../../../comon';

describe('CustomsexComponent', () => {
  let component: CustomsexComponent;
  let fixture: ComponentFixture<CustomsexComponent>;
  let mockPropageteChange = (val: TSexValues) => {};
  let mockPropageteTouch = (val: TSexValues, val2: TSexValues) => {};
  let spyPropageteChange: jasmine.Spy;
  let spyPropageteTouch: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomsexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsexComponent);
    component = fixture.componentInstance;
    spyPropageteChange = spyOn(component, "propageteChange");
    spyPropageteTouch = spyOn(component, "propageteTouch");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should registerOnChange', () => {
    component.registerOnChange(mockPropageteChange);
    expect(component.propageteChange.toString()).toBe(mockPropageteChange.toString());
  });

  it('should registerOnTouch', () => {
    component.registerOnTouched(mockPropageteTouch);
    expect(component.propageteTouch.toString()).toBe(mockPropageteTouch.toString());
  });  

  it('should writeValue', () => {
    expect(component.currentVal).toBe(-1);
    component.writeValue(0);
    expect(component.currentVal).toBe(0);
  }); 

  it('should set currentVal', () => {
    expect(component.currentVal).toBe(-1);
    component.currentVal = 1;
    expect(spyPropageteChange.calls.count()).toBe(1);
    expect(spyPropageteTouch.calls.count()).toBe(1);
    expect(component.currentVal).toBe(1);
  });   

  it('should get currentVal', () => {
    expect(component.currentVal).toBe(-1);
    component.currentVal = 1;
    expect(component.currentVal).toBe(1);
  });     
});
