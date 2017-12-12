import { TestBed, async, inject } from '@angular/core/testing';

import { SaveFormGuard, UserForm } from './save-form.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'testDummy',
  template: ''
})
class TestDummy {}

describe('SaveFormGuard', () => {
  let mockAddr1NotSearch: any = {};
  let mockAddr2NotSearch: any = {};
  let mockAddr1Search: any = {};
  let mockAddr2Search: any = {};

  beforeEach(() => {
    mockAddr1Search = {
      root: {
        children: [{
            outlet: "primary", 
            children: [{outlet: "primary", children: [{outlet: "primary", children: [], url: [{path: "4", toString: function() {return this.path;}}]}], url: [{path: "mailbox", toString: function() {return this.path;}}, {path: "inbox", toString: function() {return this.path;}}]}, {outlet: "search", children: [], url: [{path: "search", toString: function() {return this.path;}}]}],
            url: [{path: "client", toString: function() {return this.path;}}]
          }], 
        outlet: "primary",
        url: []
      },
      url: "/client/(mailbox/inbox/4//search:search)"
    };

    mockAddr1NotSearch = {
      root: {
        children: [{
            outlet: "primary", 
            children: [{outlet: "primary", children: [{outlet: "primary", children: [], url: [{path: "4", toString: function() {return this.path;}}]}], url: [{path: "mailbox", toString: function() {return this.path;}}, {path: "inbox", toString: function() {return this.path;}}]}],
            url: [{path: "client", toString: function() {return this.path;}}]
          }], 
        outlet: "primary",
        url: []
      },
      url: "/client/mailbox/inbox/4"
    };

    mockAddr2Search = {
      root: {
        children: [{
            outlet: "primary", 
            children: [{outlet: "primary", children: [{outlet: "primary", children: [], url: [{path: "9", toString: function() {return this.path;}}]}], url: [{path: "users", toString: function() {return this.path;}}]}, {outlet: "search", children: [], url: [{path: "search", toString: function() {return this.path;}}]}],
            url: [{path: "client", toString: function() {return this.path;}}]
          }], 
        outlet: "primary",
        url: []
      },
      url: "/client/(users/9//search:search)"
    };

    mockAddr2NotSearch = {
      root: {
        children: [{
            outlet: "primary", 
            children: [{outlet: "primary", children: [{outlet: "primary", children: [], url: [{path: "9", toString: function() {return this.path;}}]}], url: [{path: "users", toString: function() {return this.path;}}]}],
            url: [{path: "client", toString: function() {return this.path;}}]
          }], 
        outlet: "primary",
        url: []
      },
      url: "/client/users/9"
    };

    TestBed.configureTestingModule({
      declarations: [TestDummy],
      providers: [SaveFormGuard],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'client/mailbox/inbox/4', component: TestDummy },
        { path: 'client/users/9', component: TestDummy}
    ]) ]
    });
  });

  it('should create', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should canDeactivate1', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let component: UserForm = { canDeactivate: function() { return false; } };

    let spyComponentCanDeactivate = spyOn(component, 'canDeactivate').and.returnValue(true);    
    expect(guard.canDeactivate(component)).toBe(true);
    expect(spyComponentCanDeactivate.calls.count()).toBe(1);
  }));

  it('should canDeactivate2', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let component: UserForm = { canDeactivate: function() { return false; } };

    let spyComponentCanDeactivate = spyOn(component, 'canDeactivate').and.returnValue(false);    
    let spyOnConfirm = spyOn(window, "confirm").and.returnValue(false);
    expect(guard.canDeactivate(component)).toBe(false);
    expect(spyComponentCanDeactivate.calls.count()).toBe(1);
    expect(spyOnConfirm).toHaveBeenCalledWith("На странице есть несохраненные изменения. Хотите покинуть страницу?");
  }));

  it('should canDeactivate3', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let component: UserForm = { canDeactivate: function() { return false; } };
    
    let spyComponentCanDeactivate = spyOn(component, 'canDeactivate').and.returnValue(false);    
    let spyOnConfirm = spyOn(window, "confirm").and.returnValue(true);
    expect(guard.canDeactivate(component)).toBe(true);
    expect(spyComponentCanDeactivate.calls.count()).toBe(1);
    expect(spyOnConfirm).toHaveBeenCalledWith("На странице есть несохраненные изменения. Хотите покинуть страницу?");
  }));

  it('should canActivate1', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let router = guard.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigateByUrl');
    expect(guard.canActivate(null, mockAddr1Search)).toBe(false);
    expect(spyRouter).toHaveBeenCalledWith("/client/mailbox/inbox/4");
  }));

  it('should canActivate2', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let router = guard.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigateByUrl');
    expect(guard.canActivate(null, mockAddr1NotSearch)).toBe(true);
    expect(spyRouter).not.toHaveBeenCalled();
  }));  

  it('should canActivate3', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let router = guard.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigateByUrl');
    expect(guard.canActivate(null, mockAddr2Search)).toBe(false);
    expect(spyRouter).toHaveBeenCalledWith("/client/users/9");
  }));

  it('should canActivate4', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    let router = guard.router;
    let spyRouter: jasmine.Spy = spyOn(router, 'navigateByUrl');
    expect(guard.canActivate(null, mockAddr2NotSearch)).toBe(true);
    expect(spyRouter).not.toHaveBeenCalled();
  }));   

  it('should getPrimaryOutlet1', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    expect(guard.getPrimaryOutlet(mockAddr1Search.root)).toBe("/client/mailbox/inbox/4/");
  }));   

  it('should getPrimaryOutlet2', inject([SaveFormGuard], (guard: SaveFormGuard) => {
    expect(guard.getPrimaryOutlet(mockAddr2Search.root)).toBe("/client/users/9/");
  }));   
});
