import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
  private _searchValue: Subject<string>;

  constructor() { 
    this._searchValue = new Subject();
  }

  getSearchObs(): Observable<string> {
    return this._searchValue.asObservable();
  }

  changeSearch(val: string) {
    this._searchValue.next(val);
  }
}
