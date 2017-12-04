import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFormComponent } from './message-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MailserviceService } from '../mailservice.service';
import { API_URL } from '../../../auth.service';
import { UserproviderService } from '../../cardlist/userprovider.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { TShortUserList } from '../../../comon';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

describe('MessageFormComponent', () => {
  let component: MessageFormComponent;
  let fixture: ComponentFixture<MessageFormComponent>;
  let mailService: MailserviceService;
  let spyMailService: jasmine.Spy;
  let spyMailServiceUpdateShortUserList: jasmine.Spy;
  let spyMailServiceAddMessage: jasmine.Spy;
  let mockUserList: Array<TShortUserList>;
  let mockUserList1: Array<TShortUserList>;
  let mockFormAddMail: any;
  let mockFormChangeMail: any;
  let spyRouter: jasmine.Spy;
  let router: Router;  
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFormComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [
        MailserviceService,
        UserproviderService,
        { provide: API_URL, useValue: '' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockUserList = [{Id: 2, Value: "Шапиро Александр Ильич <testmail2@test.ru>"},{Id: 3, Value: "Ватутин Михаил Олегович <testmail3@test.ru>"}];
    mockUserList1 = [{Id: 2, Value: "Шапиро Александр Ильич <testmail2@test.ru>"},{Id: 3, Value: "Ватутин Михаил Олегович <testmail3@test.ru>"},{Id: 4, Value: "Киселев Роман Борисович <testmail4@test.ru>"}];

    mockFormAddMail = { 
      nameControl: '',
      subjectControl: '',
      txtControl: ''
    };

    mockFormChangeMail = { 
      nameControl: 'testmail@gmail.com',
      subjectControl: 'Тема сообщения',
      txtControl: 'Текст сообщения'
    };

    fixture = TestBed.createComponent(MessageFormComponent);
    component = fixture.componentInstance;

    mailService = fixture.debugElement.injector.get(MailserviceService);
    spyMailService = spyOn(mailService, 'getShortUserList').and.callThrough();
    spyMailServiceAddMessage = spyOn(mailService, 'addMessage').and.returnValue(Observable.of("false"));
    spyMailServiceUpdateShortUserList = spyOn(mailService, 'updateShortUserList');

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    route = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.formChangeSubscribe.closed).toBe(true);
  }); 

  it('should ngOnInit _mailService subscribe', () => {
    this.userListItems = undefined;
    let cntLoad = spyMailService.calls.count(); 
    let cntLoad2 = spyMailServiceUpdateShortUserList.calls.count(); 
    component.ngOnInit();
    expect(spyMailService.calls.count()).toBe(cntLoad + 1);
    expect(spyMailServiceUpdateShortUserList.calls.count()).toBe(cntLoad2 + 1);

    this.userListItems = undefined;
    cntLoad = spyMailService.calls.count(); 
    spyMailService.and.returnValue(Observable.of(mockUserList));
    component.ngOnInit();
    expect(spyMailService.calls.count()).toBe(cntLoad + 1);
    expect(component.userListItems).toEqual(mockUserList);

    mailService.setShortUserList(mockUserList1);
    expect(component.userListItems).toEqual(mockUserList1);
  }); 

  it('should ngOnInit fullControls subscribe', () => {
    component.fullControls = null;
    component.formChangeSubscribe = null;

    component.ngOnInit();   

    expect(component.fullControls).toBeDefined();
    expect(component.fullControls instanceof FormGroup).toBeTruthy();
    expect(component.fullControls.value).toEqual(mockFormAddMail); 
    expect(component.formChangeSubscribe).toBeDefined();
    expect(component.formChangeSubscribe instanceof Subscription).toBeTruthy();    
    expect(component.canDeactivateVal).toBe(true);
    component.fullControls.setValue(mockFormChangeMail);
    expect(component.canDeactivateVal).toBe(false);
  });   

  it('should validateEmail', () => {
    let fncTest = component.validateEmail();

    let testFormControl = new FormControl("test@gmail.com");    
    expect(fncTest(testFormControl)).toBe(null);

    testFormControl = new FormControl("<test@gmail.com>");    
    expect(fncTest(testFormControl)).toBe(null);

    testFormControl = new FormControl(" <test@gmail.com>");    
    expect(fncTest(testFormControl)).toBe(null);

    testFormControl = new FormControl("- <test@gmail.com>");    
    expect(fncTest(testFormControl)).toBe(null);

    testFormControl = new FormControl("Фамилия Имя Отчество <test@gmail.com>");    
    expect(fncTest(testFormControl)).toBe(null);

    testFormControl = new FormControl("Двоная Фамилия Имя Отчество <test@gmail.com>");    
    expect(fncTest(testFormControl)).toBe(null);

    testFormControl = new FormControl("Двоная Фамилия Имя Отчество <testgmail.com>");    
    expect(fncTest(testFormControl)).toEqual({validateEmail: {message: 'Введите адрес электронной почты'}});
  });   

  it('should canDeactivate', () => {
    component.canDeactivateVal = false;
    expect(component.canDeactivate()).toBe(false);
    component.canDeactivateVal = true;
    expect(component.canDeactivate()).toBe(true);
  });  

  it('should getClassByStatus', () => {
    expect(component.getClassByStatus("INVALIDfghgf")).toBe("");
    expect(component.getClassByStatus("INVALID")).toBe("invalidInput");
    expect(component.getClassByStatus("inVALID")).toBe("");
    expect(component.getClassByStatus("")).toBe("");
    expect(component.getClassByStatus(null)).toBe("");
    expect(component.getClassByStatus(undefined)).toBe("");
  }); 
  
  it('should moveToParent', () => {
    component.moveToParent();
    expect(spyRouter).toHaveBeenCalledWith(['/client/mailbox']);
  });

  it('should addMessage', () => {
    component.canDeactivateVal = false;
    let spyComponentChangeFlag = spyOn(mailService, 'changeCountMessageFlag');
    let spyComponentsetShortUserList = spyOn(mailService, 'setShortUserList');
    component.fullControls.setValue(mockFormChangeMail);
    component.addMessage();
    expect(spyMailServiceAddMessage.calls.count()).toBe(1);
    expect(spyMailServiceAddMessage).toHaveBeenCalledWith(mockFormChangeMail);
    expect(spyRouter).toHaveBeenCalledWith(["../"], {relativeTo: route});
    expect(component.canDeactivateVal).toBe(true);
    expect(spyComponentChangeFlag).toHaveBeenCalledWith(true);
    expect(spyComponentsetShortUserList.calls.count()).toBe(0);
  });

  it('should addMessage with false', () => {
    spyMailServiceAddMessage.and.returnValue(Observable.of("true"));

    component.canDeactivateVal = false;
    let spyComponentChangeFlag = spyOn(mailService, 'changeCountMessageFlag');
    let spyComponentsetShortUserList = spyOn(mailService, 'setShortUserList');
    component.fullControls.setValue(mockFormChangeMail);
    component.addMessage();
    expect(spyMailServiceAddMessage.calls.count()).toBe(1);
    expect(spyMailServiceAddMessage).toHaveBeenCalledWith(mockFormChangeMail);
    expect(spyRouter).toHaveBeenCalledWith(["../"], {relativeTo: route});
    expect(component.canDeactivateVal).toBe(true);
    expect(spyComponentChangeFlag).toHaveBeenCalledWith(true);
    expect(spyComponentsetShortUserList).toHaveBeenCalledWith(null);
  });
});
