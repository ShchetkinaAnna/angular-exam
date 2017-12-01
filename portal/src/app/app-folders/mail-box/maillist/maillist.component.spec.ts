import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaillistComponent } from './maillist.component';
import { SearchmailPipe } from '../searchmail.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../mailservice.service';
import { API_URL } from '../../../auth.service';
import { UserproviderService } from '../../cardlist/userprovider.service';
import { AppService } from '../../app.service';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { TMailListItem } from '../../../comon';

describe('MaillistComponent', () => {
  let component: MaillistComponent;
  let fixture: ComponentFixture<MaillistComponent>;
  let spyAppService: jasmine.Spy;
  let appService: AppService;
  let route: ActivatedRoute;
  let mailserviceService: MailserviceService;
  let spyMailserviceService: jasmine.Spy;
  let spyRouter: jasmine.Spy;
  let spyOnConfirm: jasmine.Spy;
  let spyMailserviceServiceDelete: jasmine.Spy;
  let spyMailServicechangeCountMessageFlag: jasmine.Spy;
  let router: Router;

  let mockFolderParam: string = "inbox";
  let mockNullMailList: Array<TMailListItem> = [];
  let mockMailList: Array<TMailListItem>;
  let mockMailListWithChackedFalse: Array<TMailListItem>;  
  let mockMailListWithChackedTrue: Array<TMailListItem>;   
  let mockMailListWithChackedFalse2: Array<TMailListItem>; 
  let mockMailListWithChackedTrue2: Array<TMailListItem>;      

  beforeEach(async(() => {    
    TestBed.configureTestingModule({
      declarations: [ 
        MaillistComponent,
        SearchmailPipe ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MailserviceService,
        UserproviderService,
        AppService,
        { provide: API_URL, useValue: '' },
        DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockMailList = [
      {
        Id:"7",
        Subject:"RE:Это еще одно письмо",
        Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",
        InDate:Date.parse("2017-10-11 13:14:55"),
        User:{"F":"Шапиро","I":"Александр","O":"Ильич","Email":"testmail2@test.ru","Id":2}
      },
      {
        Id:"6",
        Subject:"RE:Это первое письмо",
        Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
        InDate:Date.parse("2017-04-18 18:19:20"),
        User:{"F":"Синицын","I":"Юрий","O":"Николаевич","Email":"testmail6@test.ru","Id":6}
      }
    ];
  
    mockMailListWithChackedFalse = [
      {
        Id:"7",
        Subject:"RE:Это еще одно письмо",
        Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",
        InDate:Date.parse("2017-10-11 13:14:55"),
        User:{"F":"Шапиро","I":"Александр","O":"Ильич","Email":"testmail2@test.ru","Id":2},
        Checked: false
      },
      {
        Id:"6",
        Subject:"RE:Это первое письмо",
        Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
        InDate:Date.parse("2017-04-18 18:19:20"),
        User:{"F":"Синицын","I":"Юрий","O":"Николаевич","Email":"testmail6@test.ru","Id":6},
        Checked: false
      }
    ];  
  
    mockMailListWithChackedTrue = [
      {
        Id:"7",
        Subject:"RE:Это еще одно письмо",
        Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",
        InDate:Date.parse("2017-10-11 13:14:55"),
        User:{"F":"Шапиро","I":"Александр","O":"Ильич","Email":"testmail2@test.ru","Id":2},
        Checked: true
      },
      {
        Id:"6",
        Subject:"RE:Это первое письмо",
        Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
        InDate:Date.parse("2017-04-18 18:19:20"),
        User:{"F":"Синицын","I":"Юрий","O":"Николаевич","Email":"testmail6@test.ru","Id":6},
        Checked: false
      },
      {
        Id:"8",
        Subject:"RE:Это еще одно письмо",
        Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",
        InDate:Date.parse("2017-10-11 13:14:55"),
        User:{"F":"Шапиро","I":"Александр","O":"Ильич","Email":"testmail2@test.ru","Id":2},
        Checked: true
      }
    ];    
  
    mockMailListWithChackedFalse2 = [
      {
        Id:"7",
        Subject:"RE:Это еще одно письмо",
        Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",
        InDate:Date.parse("2017-10-11 13:14:55"),
        User:{"F":"Шапиро","I":"Александр","O":"Ильич","Email":"testmail2@test.ru","Id":2}
      },
      {
        Id:"6",
        Subject:"RE:Это первое письмо",
        Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
        InDate:Date.parse("2017-04-18 18:19:20"),
        User:{"F":"Синицын","I":"Юрий","O":"Николаевич","Email":"testmail6@test.ru","Id":6},
        Checked: false
      }
    ];  
  
    mockMailListWithChackedTrue2 = [
      {
        Id:"7",
        Subject:"RE:Это еще одно письмо",
        Text:"You've created two routes in the app so far, one to /crisis-center and the other to /heroes. Any other URL causes the router to throw an error and crash the app. Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom \"404 Not Found\" component or redirect to an existing route.",
        InDate:Date.parse("2017-10-11 13:14:55"),
        User:{"F":"Шапиро","I":"Александр","O":"Ильич","Email":"testmail2@test.ru","Id":2},
        Checked: true
      },
      {
        Id:"6",
        Subject:"RE:Это первое письмо",
        Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
        InDate:Date.parse("2017-04-18 18:19:20"),
        User:{"F":"Синицын","I":"Юрий","O":"Николаевич","Email":"testmail6@test.ru","Id":6}
      }
    ];        

    fixture = TestBed.createComponent(MaillistComponent);
    component = fixture.componentInstance;

    route = fixture.debugElement.injector.get(ActivatedRoute);

    appService = fixture.debugElement.injector.get(AppService);
    spyAppService = spyOn(appService, 'getSearchObs').and.returnValue(Observable.of("ива"));

    mailserviceService = fixture.debugElement.injector.get(MailserviceService);
    spyMailserviceService = spyOn(mailserviceService, 'getMessages').and.returnValue(Observable.of(mockNullMailList));
    spyMailserviceServiceDelete = spyOn(mailserviceService, 'deleteMails').and.returnValue(Observable.of(""));
    spyMailServicechangeCountMessageFlag = spyOn(mailserviceService, 'changeCountMessageFlag');

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    spyOnConfirm = spyOn(window, "confirm").and.returnValue(false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit searchSubscribe', () => {    
    expect(component.searchSubscribe).toBeDefined();
    expect(component.searchSubscribe instanceof Subscription).toBeTruthy();
    expect(spyAppService.calls.count()).toBe(1);
    expect(component.searchText).toBe('ива');

    spyAppService.and.returnValue(Observable.of("")); 
    component.ngOnInit();    
    expect(component.searchText).toBe('');

    spyAppService.and.returnValue(Observable.of(null));  
    component.ngOnInit();    
    expect(component.searchText).toBe('');

    spyAppService.and.returnValue(Observable.of(undefined));  
    component.ngOnInit();    
    expect(component.searchText).toBe('');
  }); 

  it('should ngOnInit routeParamsSubscribe', () => {    
    let spyComponentOngetMessages = spyOn(component, 'getMessages'); 
    let cntLoad = spyComponentOngetMessages.calls.count(); 

    component.routeParamsSubscribe = null;
    route.params = Observable.of({folder: mockFolderParam});
    component.ngOnInit();
    expect(component.routeParamsSubscribe).toBeDefined();
    expect(component.routeParamsSubscribe instanceof Subscription).toBeTruthy();
    expect(spyComponentOngetMessages.calls.count()).toBe(cntLoad + 1);        
    expect(component.folderId).toBe(mockFolderParam);
  }); 

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.searchSubscribe.closed).toBe(true);
    expect(component.routeParamsSubscribe.closed).toBe(true);
  }); 

  it('should getMessages', () => {
    component.mailItems = undefined;
    component.folderId = mockFolderParam;
    component.getMessages();
    expect(spyMailserviceService).toHaveBeenCalledWith(mockFolderParam);
    expect(component.mailItems).toEqual([]);

    spyMailserviceService.and.returnValue(Observable.of(mockMailList));  
    component.getMessages();
    expect(component.mailItems).toEqual(mockMailList);
  });

  it('should getCheckedFlag', () => {
    component.mailItems = undefined;
    expect(component.getCheckedFlag()).toBe(true);

    component.mailItems = [];
    expect(component.getCheckedFlag()).toBe(true);

    component.mailItems = mockMailList;
    expect(component.getCheckedFlag()).toBe(true);

    component.mailItems = mockMailListWithChackedFalse;
    expect(component.getCheckedFlag()).toBe(true);    

    component.mailItems = mockMailListWithChackedTrue;
    expect(component.getCheckedFlag()).toBe(false);        

    component.mailItems = mockMailListWithChackedFalse2;
    expect(component.getCheckedFlag()).toBe(true);    

    component.mailItems = mockMailListWithChackedTrue2;
    expect(component.getCheckedFlag()).toBe(false);        
  }); 

  it('should onCheckedAll', () => {
    component.mailItems = [];
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(false);    

    component.mailItems = mockMailList;
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);    

    component.mailItems = mockMailListWithChackedFalse;
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.mailItems = mockMailListWithChackedFalse2;
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);    

    component.mailItems = mockMailListWithChackedTrue;
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);    

    component.mailItems = mockMailListWithChackedTrue2;
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.mailItems.find(item => item.Checked)).toBeTruthy();
    expect(component.mailItems.find(item => !item.Checked)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.mailItems.find(item => item.Checked)).toBeUndefined();
    expect(component.mailItems.find(item => !item.Checked)).toBeTruthy();
    expect(component.checkedAll).toBe(false); 
  });

  it('should checkElement', () => {
    expect(mockMailList[0].Checked).toBeUndefined();
    component.checkElement(null, mockMailList[0]);
    expect(mockMailList[0].Checked).toBe(true);

    expect(mockMailListWithChackedFalse[0].Checked).toBe(false);
    component.checkElement(null, mockMailListWithChackedFalse[0]);
    expect(mockMailListWithChackedFalse[0].Checked).toBe(true);

    expect(mockMailListWithChackedTrue[0].Checked).toBe(true);
    component.checkElement(null, mockMailListWithChackedTrue[0]);
    expect(mockMailListWithChackedTrue[0].Checked).toBe(false);
  });

  it('should goToMessage', () => {
    component.goToMessage(5);
    expect(spyRouter).toHaveBeenCalledWith([5], {relativeTo: route});
  }); 

  it('should onDelete', () => {
    component.onDelete();
    expect(spyOnConfirm).toHaveBeenCalledWith("Вы уверены, что хотите удалить? Письма будут перемещены в папку 'Удаленные'.");
    expect(spyMailserviceServiceDelete.calls.count()).toBe(0);

    component.folderId = "trashbin";
    component.onDelete();
    expect(spyOnConfirm).toHaveBeenCalledWith("Вы уверены, что хотите удалить? Письма будут удалены без возможности восстановления.");

    let spyComponentOngetList = spyOn(component, 'getMessages');  
    spyOnConfirm.and.returnValue(true);
    component.mailItems = mockMailListWithChackedTrue;
    component.checkedAll = true;
    let cntLoad = spyComponentOngetList.calls.count(); 
    component.onDelete();
    expect(spyMailserviceServiceDelete).toHaveBeenCalledWith("7|8");
    expect(spyComponentOngetList.calls.count()).toBe(cntLoad + 1);    
    expect(component.checkedAll).toBe(false);  
    expect(spyMailServicechangeCountMessageFlag).toHaveBeenCalledWith(true);  
  });
});
