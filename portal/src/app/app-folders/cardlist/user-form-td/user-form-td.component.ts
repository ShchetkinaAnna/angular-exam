import { Component, OnInit, ViewChild } from '@angular/core';
import { UserproviderService } from '../../../userprovider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForm } from '../../../save-form.guard';

@Component({
  selector: 'app-user-form-td',
  templateUrl: './user-form-td.component.html',
  styleUrls: ['./user-form-td.component.css']
})
export class UserFormTdComponent implements OnInit, UserForm {
  @ViewChild('f') form;
  
  minYears: number = 18;
  etYears: Date = new Date();  
  canDeactivateVal: boolean = true;

  familyControl: string = '';
  nameControl: string = '';
  secondNameControl: string = '';
  email: string = '';
  bDay: string = '';
  userSex: string = '';

  private sexArray = [{Id: null, Name: ''}, {Id: 0, Name: 'Мужской'}, {Id: 1, Name: 'Женский'}];  

  constructor(private _userproviderService: UserproviderService, private router: Router, private route: ActivatedRoute) {
    this.etYears.setFullYear(this.etYears.getFullYear() - this.minYears);
   }

  ngOnInit() {       
    this.bDay = this.etYears.toISOString().substring(0,10); 
  }

  ngAfterViewChecked() {    
    this.form.control.valueChanges
      .subscribe((item) => {this.canDeactivateVal = false});
  }

  addUser(formData: any) {
    this._userproviderService.addUser(formData.value).subscribe((item) => {
      this.canDeactivateVal = true;
      this.router.navigate(["../"], {relativeTo: this.route});
    },
    (err: HttpErrorResponse) => this._userproviderService.handleError(err));
  }

  canDeactivate() {
    return this.canDeactivateVal;
  }

}
