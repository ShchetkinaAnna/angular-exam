import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MailserviceService } from '../mailservice.service';
import { API_URL } from '../../../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserproviderService } from '../../cardlist/userprovider.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TMailListItem } from '../../../comon';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let route: ActivatedRoute;
  let mailserviceService: MailserviceService;
  let spyMailserviceService: jasmine.Spy;
  let mockId: string = "6";
  let mockMessageObj: TMailListItem;

  beforeEach(async(() => {
    mockMessageObj = {
      Id:"6",
      Subject:"RE:Это первое письмо",
      Text:"Had the navigation path been more dynamic, you could have bound to a template expression that returned an array of route link parameters (the link parameters array). The router resolves that array into a complete URL. The RouterLinkActive directive on each anchor tag helps visually distinguish the anchor for the currently selected \\\"active\\\" route. The router adds the active CSS class to the element when the associated RouterLink becomes active. You can add this directive to the anchor or to its parent element.",
      InDate:Date.parse("2017-04-18 18:19:20"),
      User:{"F":"Синицын","I":"Юрий","O":"Николаевич","Email":"testmail6@test.ru","Id":6}
    };

    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ MailserviceService,
        { provide: API_URL, useValue: '' }, 
        UserproviderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;

    route = fixture.debugElement.injector.get(ActivatedRoute);

    mailserviceService = fixture.debugElement.injector.get(MailserviceService);
    spyMailserviceService = spyOn(mailserviceService, 'getMessage').and.returnValue(Observable.of(mockMessageObj));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit routeParamsSubscribe', () => {    
    let spyComponentOngetMessages = spyOn(component, 'getMessage'); 
    let cntLoad = spyComponentOngetMessages.calls.count(); 

    component.routeParamsSubscribe = null;
    route.params = Observable.of({message: mockId});
    component.ngOnInit();
    expect(component.routeParamsSubscribe).toBeDefined();
    expect(component.routeParamsSubscribe instanceof Subscription).toBeTruthy();
    expect(spyComponentOngetMessages.calls.count()).toBe(cntLoad + 1);        
    expect(spyComponentOngetMessages).toHaveBeenCalledWith(mockId);
  }); 

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.routeParamsSubscribe.closed).toBe(true);
  });

  it('should getMessage', () => {
    component.messageId = undefined;
    component.message = undefined;
    component.getMessage(mockId);
    expect(component.messageId.toString()).toBe(mockId);
    expect(spyMailserviceService).toHaveBeenCalledWith(mockId);
    expect(component.message).toEqual(mockMessageObj);
  });
});
