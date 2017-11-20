import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchField') searchField; 
  private eventSubscribe: Subscription;
  
  constructor(private _appService: AppService) { }

  ngOnDestroy() {
    if (!!this.eventSubscribe) { this.eventSubscribe.unsubscribe(); }
  }

  ngOnInit() {
    var o = Observable.fromEvent(this.searchField.nativeElement, "input");
    this.eventSubscribe = o.debounce(() => Observable.timer(500)).subscribe((event: KeyboardEvent) => 
      {
        if (event.target["value"].length != 1) {
          this._appService.changeSearch(event.target["value"]);
        }
      }
    );
  }
}
