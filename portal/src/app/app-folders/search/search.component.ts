import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchField') searchField; 
  
  constructor(private _appService: AppService) { }

  ngOnInit() {
    var o = Observable.fromEvent(this.searchField.nativeElement, "input");
    o.debounce(() => Observable.timer(500)).subscribe((event: KeyboardEvent) => 
      {
        if (event.target["value"].length != 1) {
          this._appService.changeSearch(event.target["value"]);
        }
      }
    );
  }

}
