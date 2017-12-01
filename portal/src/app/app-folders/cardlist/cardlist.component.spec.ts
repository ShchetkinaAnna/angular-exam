import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardlistComponent } from './cardlist.component';
import { SearchPipe } from './search.pipe';
import { UsercardComponent } from './usercard/usercard.component';
import { UsersexPipe } from './usersex.pipe';
import { UserproviderService } from './userprovider.service';
import { API_URL } from '../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';
import { MailserviceService } from '../mail-box/mailservice.service';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { TUserCard } from '../../comon';

describe('CardlistComponent', () => {
  let component: CardlistComponent;
  let fixture: ComponentFixture<CardlistComponent>;
  let appService: AppService;
  let userproviderService: UserproviderService;
  let spyAppService: jasmine.Spy;
  let spyUserproviderService: jasmine.Spy;
  let spyOnConfirm: jasmine.Spy;
  let spyUserproviderServiceDelete: jasmine.Spy;
  let router: Router;
  let spyRouter: jasmine.Spy;
  let route: ActivatedRoute;
  let mailService: MailserviceService;
  let spyMailService: jasmine.Spy;

  let mockNullUserList: Array<TUserCard>;
  let mockUserList: Array<TUserCard>;
  let mockUserListWithCheck: Array<TUserCard>;
  let mockUserCardSelect: TUserCard;  
  let mockUserCardNotSelect: TUserCard;  
  let mockNullUserListBack;
  let mockUserListBack;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CardlistComponent, 
        SearchPipe, 
        UsercardComponent,
        UsersexPipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],  
      providers: [ UserproviderService,
        AppService,
        MailserviceService,
        { provide: API_URL, useValue: '' },
        UsersexPipe,
        DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockNullUserList = new Array<TUserCard>();
    mockUserList = [
      {
        UserID:2, 
        BirthDate: Date.parse("1973-12-01"),
        F: "Шапиро",
        I: "Александр",
        O: "Ильич",
        Sex: 0,
        Email: "testmail2@test.ru",
        Checked: false
      },
      {
        UserID:3, 
        BirthDate: Date.parse("1984-01-08"),
        F: "Ватутин",
        I: "Михаил",
        O: "Олегович",
        Sex: 0,
        Email: "testmail3@test.ru",
        Checked: false
      },
      {
        UserID:20, 
        BirthDate: Date.parse("1963-02-06"),
        F: "Молчанова",
        I: "Лариса",
        O: "Викторовна",
        Sex: 1,
        Email: "testmail20@test.ru",
        Checked: false
      }
    ];
  
    mockUserListWithCheck = [
      {
        UserID:2, 
        BirthDate: Date.parse("1973-12-01"),
        F: "Шапиро",
        I: "Александр",
        O: "Ильич",
        Sex: 0,
        Email: "testmail2@test.ru",
        Checked: true
      },
      {
        UserID:3, 
        BirthDate: Date.parse("1984-01-08"),
        F: "Ватутин",
        I: "Михаил",
        O: "Олегович",
        Sex: 0,
        Email: "testmail3@test.ru",
        Checked: true
      },
      {
        UserID:20, 
        BirthDate: Date.parse("1963-02-06"),
        F: "Молчанова",
        I: "Лариса",
        O: "Викторовна",
        Sex: 1,
        Email: "testmail20@test.ru",
        Checked: false
      }
    ];
  
    mockUserCardSelect = {    
        UserID:2, 
        BirthDate: Date.parse("1973-12-01"),
        F: "Шапиро",
        I: "Александр",
        O: "Ильич",
        Sex: 0,
        Email: "testmail2@test.ru",
        Checked: true    
    };  
  
    mockUserCardNotSelect = {    
      UserID:2, 
      BirthDate: Date.parse("1973-12-01"),
      F: "Шапиро",
      I: "Александр",
      O: "Ильич",
      Sex: 0,
      Email: "testmail2@test.ru",
      Checked: false    
    };  
  
    mockNullUserListBack = {UserList: []};
    mockUserListBack = {"UserList":[
      {"F":"Шапиро","I":"Александр","O":"Ильич","Sex":0,"Email":"testmail2@test.ru","Id":2,"BD":"1973-12-01"},
      {"F":"Ватутин","I":"Михаил","O":"Олегович","Sex":0,"Email":"testmail3@test.ru","Id":3,"BD":"1984-01-08"},
      {"F":"Молчанова","I":"Лариса","O":"Викторовна","Sex":1,"Email":"testmail20@test.ru","Id":20,"BD":"1963-02-06"}]};

    fixture = TestBed.createComponent(CardlistComponent);
    component = fixture.componentInstance;

    appService = fixture.debugElement.injector.get(AppService);
    spyAppService = spyOn(appService, 'getSearchObs').and.returnValue(Observable.of("ива"));

    userproviderService = fixture.debugElement.injector.get(UserproviderService);
    spyUserproviderService = spyOn(userproviderService, 'getUsers').and.returnValue(Observable.of(mockNullUserListBack));
    spyUserproviderServiceDelete = spyOn(userproviderService, 'deleteUsers').and.returnValue(Observable.of(""));

    mailService = fixture.debugElement.injector.get(MailserviceService);
    spyMailService = spyOn(mailService, 'setShortUserList');

    spyOnConfirm = spyOn(window, "confirm").and.returnValue(false);

    router = fixture.debugElement.injector.get(Router);
    spyRouter = spyOn(router, 'navigate');

    route = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {    
    expect(component.searchSubscribe).toBeDefined();
    expect(component.searchSubscribe instanceof Subscription).toBeTruthy();
    expect(spyAppService.calls.count()).toBe(1);
    expect(component.searchText).toBe('ива');

    let spyComponentOngetList = spyOn(component, 'getList');  
    spyAppService.and.returnValue(Observable.of("")); 
    let cntLoad = spyComponentOngetList.calls.count(); 
    component.ngOnInit();    
    expect(component.searchText).toBe('');
    expect(spyComponentOngetList.calls.count()).toBe(cntLoad + 1);    

    spyAppService.and.returnValue(Observable.of(null));  
    component.ngOnInit();    
    expect(component.searchText).toBe('');

    spyAppService.and.returnValue(Observable.of(undefined));  
    component.ngOnInit();    
    expect(component.searchText).toBe('');
  }); 

  it('should ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.searchSubscribe.closed).toBe(true);
  }); 

  it('should onAdd', () => {
    component.onAdd();
    expect(spyRouter).toHaveBeenCalledWith(["./addUser"], {relativeTo: route});
  });

  it('should getList', () => {
    component.getList();
    expect(spyUserproviderService).toHaveBeenCalled();
    expect(component.userCards).toEqual(mockNullUserList);

    spyUserproviderService.and.returnValue(Observable.of(mockUserListBack));  
    component.getList();
    expect(component.userCards).toEqual(mockUserList);
  });

  it('should onDelete', () => {
    component.onDelete();
    expect(spyUserproviderServiceDelete.calls.count()).toBe(0);

    let spyComponentOngetList = spyOn(component, 'getList');  
    spyOnConfirm.and.returnValue(true);
    component.userCards = mockUserListWithCheck;
    component.checkedAll = true;
    let cntLoad = spyComponentOngetList.calls.count(); 
    component.onDelete();
    expect(spyUserproviderServiceDelete).toHaveBeenCalledWith("2|3");
    expect(spyComponentOngetList.calls.count()).toBe(cntLoad + 1);    
    expect(component.checkedAll).toBe(false);  
    expect(spyMailService).toHaveBeenCalledWith(null);  
  });

  it('should getCheckedFlag', () => {
    component.userCards = mockUserListWithCheck;
    expect(component.getCheckedFlag()).toBe(false);

    component.userCards = mockUserList;
    expect(component.getCheckedFlag()).toBe(true);

    component.userCards = mockNullUserList;
    expect(component.getCheckedFlag()).toBe(true);
  });

  it('should selectUserCard', () => {
    component.userCards = mockUserList;
    expect(component.userCards[0].Checked).toBe(false);
    
    component.selectUserCard(mockUserCardSelect);
    expect(component.userCards[0].Checked).toBe(true);

    component.selectUserCard(mockUserCardNotSelect);
    expect(component.userCards[0].Checked).toBe(false);
  });

  it('should onCheckedAll', () => {
    component.userCards = [];
    expect(component.userCards.find(item => item.Checked == true)).toBeUndefined();
    expect(component.userCards.find(item => item.Checked == false)).toBeUndefined();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.userCards.find(item => item.Checked == true)).toBeUndefined();
    expect(component.userCards.find(item => item.Checked == false)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.userCards.find(item => item.Checked == true)).toBeUndefined();
    expect(component.userCards.find(item => item.Checked == false)).toBeUndefined();
    expect(component.checkedAll).toBe(false);  

    component.userCards = mockUserList;
    expect(component.userCards.find(item => item.Checked == true)).toBeUndefined();
    expect(component.userCards.find(item => item.Checked == false)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.userCards.find(item => item.Checked == true)).toBeTruthy();
    expect(component.userCards.find(item => item.Checked == false)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.userCards.find(item => item.Checked == true)).toBeUndefined();
    expect(component.userCards.find(item => item.Checked == false)).toBeTruthy();
    expect(component.checkedAll).toBe(false);    

    component.userCards = mockUserListWithCheck;
    expect(component.userCards.find(item => item.Checked == true)).toBeTruthy();
    expect(component.userCards.find(item => item.Checked == false)).toBeTruthy();
    expect(component.checkedAll).toBe(false);

    component.onCheckedAll(true);
    expect(component.userCards.find(item => item.Checked == true)).toBeTruthy();
    expect(component.userCards.find(item => item.Checked == false)).toBeUndefined();
    expect(component.checkedAll).toBe(true);

    component.onCheckedAll(false);
    expect(component.userCards.find(item => item.Checked == true)).toBeUndefined();
    expect(component.userCards.find(item => item.Checked == false)).toBeTruthy();
    expect(component.checkedAll).toBe(false);    
  });
});
