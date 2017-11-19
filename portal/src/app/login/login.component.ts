import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private _authService: AuthService) { }

  fullControls: FormGroup;

  ngOnInit() {    
    this.fullControls = new FormGroup(
      {
        login: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
      }
    );        
  }

  getClassByStatus(status: string) {
    if (status == "INVALID") {
      return "invalidInput";
    }
    return "";
  }

  loginClick() {
    this._authService.authorization(this.fullControls.controls.login.value, this.fullControls.controls.password.value);
  }

}
