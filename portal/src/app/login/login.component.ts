import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('LoginUser') LoginUser; 

  constructor(private router: Router) { }

  ngOnInit() {    
  }

  ngAfterViewInit() {    
    var o = Observable.fromEvent(this.LoginUser.nativeElement, "input");
    //o.debounceTime(1000).subscribe((event: KeyboardEvent) => console.log(event.target["value"]));
    // или
    o.debounce(() => Observable.timer(1000)).subscribe((event: KeyboardEvent) => console.log(event.target["value"]));
  }

  loginClick() {
    this.router.navigate(["/client"]);
  }

}
