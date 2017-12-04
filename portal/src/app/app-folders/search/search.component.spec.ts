import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { AppService } from '../app.service';
import { asap } from 'rxjs/scheduler/asap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let appService: AppService;
  let spyappService: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [ AppService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    appService = fixture.debugElement.injector.get(AppService);
    spyappService = spyOn(appService, 'changeSearch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.eventSubscribe.closed).toBe(true);
  }); 

  it('should ngOnInit', fakeAsync(() => {
    component.eventSubscribe = undefined;
    let el = component.searchField.nativeElement;

    component.ngOnInit();   

    expect(component.eventSubscribe).toBeDefined();
    expect(component.eventSubscribe instanceof Subscription).toBeTruthy();    

    el.value = 'H';
    el.dispatchEvent(new Event('input'));
    expect(spyappService.calls.count()).toBe(0); 
    tick(500);
    expect(spyappService.calls.count()).toBe(0);

    el.value = 'He';
    el.dispatchEvent(new Event('input'));    
    tick(500);
    expect(spyappService).toHaveBeenCalledWith('He'); 
    let cnt = spyappService.calls.count();

    el.value = 'Hello World';
    el.dispatchEvent(new Event('input'));
    expect(spyappService.calls.count()).toBe(cnt); 
    tick(500);
    expect(spyappService.calls.count()).toBeGreaterThan(cnt);   
    expect(spyappService).toHaveBeenCalledWith('Hello World'); 
  })); 
});
