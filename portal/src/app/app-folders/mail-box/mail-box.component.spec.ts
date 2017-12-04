import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailBoxComponent } from './mail-box.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from './mailservice.service';
import { API_URL } from '../../auth.service';
import { UserproviderService } from '../cardlist/userprovider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { TFolder } from '../../comon';
import { Router, ActivatedRoute } from '@angular/router';

describe('MailBoxComponent', () => {
  let component: MailBoxComponent;
  let fixture: ComponentFixture<MailBoxComponent>;
  let mailService: MailserviceService;
  let spyMailService: jasmine.Spy;
  let spyMailServiceGetFolders: jasmine.Spy;
  let spyRouter: jasmine.Spy;
  let mockFolders: Array<TFolder>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailBoxComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MailserviceService,
        { provide: API_URL, useValue: '' },
        UserproviderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockFolders = [{"Id":"inbox","Name":"Входящие (4)"},{"Id":"sent","Name":"Отправленные (2)"},{"Id":"trashbin","Name":"Удаленные (1)"}];

    fixture = TestBed.createComponent(MailBoxComponent);
    component = fixture.componentInstance;

    mailService = fixture.debugElement.injector.get(MailserviceService);
    spyMailService = spyOn(mailService, 'getChangeCountMessagesObs').and.callThrough();
    spyMailServiceGetFolders = spyOn(mailService, 'getFolders').and.returnValue(Observable.of(mockFolders));

    route = fixture.debugElement.injector.get(ActivatedRoute);

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit searchSubscribe', () => {   
    let cntLoad2 = spyMailService.calls.count();     
    component.deleteSubscribe = null;
    let spyComponentOngetMessages = spyOn(component, 'getFolders'); 
    let cntLoad = spyComponentOngetMessages.calls.count(); 

    component.ngOnInit();

    expect(component.deleteSubscribe).toBeDefined();
    expect(component.deleteSubscribe instanceof Subscription).toBeTruthy();
    expect(spyMailService.calls.count()).toBe(cntLoad2 + 1);
    expect(spyComponentOngetMessages.calls.count()).toBe(cntLoad + 1);   

    mailService.changeCountMessageFlag(true);
    expect(spyComponentOngetMessages.calls.count()).toBeGreaterThan(cntLoad + 1);
  }); 

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.deleteSubscribe.closed).toBe(true);
  }); 

  it('should getFolders', () => {
    component.folderList = undefined;
    component.getFolders();
    expect(spyMailServiceGetFolders).toHaveBeenCalled();
    expect(component.folderList).toEqual(mockFolders);
  });

  it('should onAdd', () => {
    component.onAdd();
    expect(spyRouter).toHaveBeenCalledWith(["./addMessage"], {relativeTo: route});
  });
});
