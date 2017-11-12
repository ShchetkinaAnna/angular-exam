import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserproviderService } from '../../../userprovider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForm } from '../../../save-form.guard';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, UserForm {
  minYears: number = 18;
  etYears: Date = new Date();
  canDeactivateVal: boolean = true;

  fullControls: FormGroup;

  private sexArray = [{Id: null, Name: ''}, {Id: 0, Name: 'Мужской'}, {Id: 1, Name: 'Женский'}];

  constructor(private _userproviderService: UserproviderService, private router: Router, private route: ActivatedRoute) { 
    this.etYears.setFullYear(this.etYears.getFullYear() - this.minYears);
  }

  ngOnInit() {
    this.fullControls = new FormGroup(
      {
        nameControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
        familyControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
        secondNameControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
        userSex: new FormControl('', [Validators.required]),
        bDay: new FormControl(this.etYears.toISOString().substring(0,10), [this.validateBD(this.etYears)]),
        email: new FormControl('', [Validators.required])
      }
    );
    this.fullControls.valueChanges.subscribe((item) => {this.canDeactivateVal = false});    
  }

  addUser() {
    this._userproviderService.addUser(this.fullControls.value).subscribe((item) => {
      this.canDeactivateVal = true;
      this.router.navigate(["../"], {relativeTo: this.route});
    },
    (err: HttpErrorResponse) => this._userproviderService.handleError(err));
  }

  getClassByStatus(status: string) {
    if (status == "INVALID") {
      return "invalidInput";
    }
    return "";
  }

  validateBD (etYears: Date) {
    return function (formControl: FormControl) {
      if (new Date(Date.parse(formControl.value))<etYears) {
        return null;
      }
      else {
        return {validateBD: {message: 'Ещё нет 18 лет'}}
      }
    }
  }

  canDeactivate() {
    return this.canDeactivateVal;
  }

}


