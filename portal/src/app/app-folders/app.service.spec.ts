import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';
import { Subject } from 'rxjs/Subject';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
    expect(service._searchValue).toBeDefined();
    expect(service._searchValue instanceof Subject).toBeTruthy();
  }));

  it('should be getSearchObs', inject([AppService], (service: AppService) => {
    let bool: string = "123";
    service.getSearchObs().subscribe(
      (item) => { expect(item).toBe(bool); }
    );
    service._searchValue.next(bool);
    bool = "345";
    service._searchValue.next(bool);
  }));  

  it('should be changeSearch', inject([AppService], (service: AppService) => {
    let bool: string = "123";
    service._searchValue.asObservable().subscribe(
      (item) => { expect(item).toBe(bool); }
    );    
    service.changeSearch(bool);
    bool = "345";
    service.changeSearch(bool);
  })); 
});
