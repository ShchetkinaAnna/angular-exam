import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserproviderService } from '../userprovider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForm } from '../../../save-form.guard';
import { Subscription } from 'rxjs/Subscription';
import { MailserviceService } from '../../mail-box/mailservice.service';
import { TUserCard } from '../../../comon';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, UserForm {
  minYears: number = 18;
  etYears: Date = new Date();
  canDeactivateVal: boolean = true;
  formChangeSubscribe: Subscription;
  routerDataSubscribe: Subscription;

  fullControls: FormGroup;
  userId: number = -1;

  public sexArray = [{Id: null, Name: ''}, {Id: 0, Name: 'Мужской'}, {Id: 1, Name: 'Женский'}];

  constructor(private _userproviderService: UserproviderService, private router: Router, private route: ActivatedRoute, private _mailService: MailserviceService) { 
    this.etYears.setFullYear(this.etYears.getFullYear() - this.minYears);
  }

  ngOnInit() {
    this.routerDataSubscribe = this.route.data
    .subscribe((data: { user: TUserCard } ) => {
      if (this.route.snapshot.paramMap.get('id') != null) {
        this.userId = <number><any>this.route.snapshot.paramMap.get('id');
        this.fullControls = new FormGroup(
          {
            nameControl: new FormControl(data.user.I, [Validators.required, Validators.minLength(2)]),
            familyControl: new FormControl(data.user.F, [Validators.required, Validators.minLength(2)]),
            secondNameControl: new FormControl(data.user.O, [Validators.required, Validators.minLength(2)]),
            userSex: new FormControl(data.user.Sex, [this.validateSex()]),
            bDay: new FormControl(data.user.BirthDate, [this.validateBD(this.etYears)]),
            email: new FormControl(data.user.Email, [Validators.required])
          }
        );
      }
      else {
        this.fullControls = new FormGroup(
          {
            nameControl: new FormControl("", [Validators.required, Validators.minLength(2)]),
            familyControl: new FormControl("", [Validators.required, Validators.minLength(2)]),
            secondNameControl: new FormControl("", [Validators.required, Validators.minLength(2)]),
            userSex: new FormControl(-1, [this.validateSex()]),
            bDay: new FormControl(this.etYears.toISOString().substring(0,10), [this.validateBD(this.etYears)]),
            email: new FormControl('', [Validators.required])
          }
        );        
      }
      this.formChangeSubscribe = this.fullControls.valueChanges.subscribe((item) => {this.canDeactivateVal = false}); 
    });
  }

  ngOnDestroy() {
    if (!!this.formChangeSubscribe) { this.formChangeSubscribe.unsubscribe(); }
    if (!!this.routerDataSubscribe) { this.routerDataSubscribe.unsubscribe(); }
  }

  moveToParent() {
    this.router.navigate(['/client/users']);
  }

  addUser() {
    if (this.userId != -1) {
      this._userproviderService.editUser(this.userId, this.fullControls.value).subscribe((item) => {
        this._mailService.setShortUserList(null);
        this.canDeactivateVal = true;
        this.router.navigate(["../"], {relativeTo: this.route});
      });
    }
    else {
      this._userproviderService.addUser(this.fullControls.value).subscribe((item) => {
        this._mailService.setShortUserList(null);
        this.canDeactivateVal = true;
        this.router.navigate(["../"], {relativeTo: this.route});
      });
    }
  }

  getClassByStatus(status: string) {
    if (status == "INVALID") {
      return "invalidInput";
    }
    return "";
  }

  validateSex() {
    return function (formControl: FormControl) {
      if (formControl.value != -1) {
        return null;
      }
      else {
        return {validateSex: {message: 'Укажите пол'}}
      }
    }
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


