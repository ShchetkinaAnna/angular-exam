import { Component, OnInit } from '@angular/core';
import { UserForm } from '../../../save-form.guard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MailserviceService } from '../mailservice.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TShortUserList } from '../../../comon';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit, UserForm {
  fullControls: FormGroup;
  userListItems: Array<TShortUserList>;
  public formChangeSubscribe: Subscription;
  canDeactivateVal: boolean = true;
  
  constructor(private _mailService: MailserviceService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnDestroy() {
    if (!!this.formChangeSubscribe) { this.formChangeSubscribe.unsubscribe(); }
  }

  ngOnInit() {
    this._mailService.getShortUserList().subscribe(
      (item: Array<TShortUserList>) => { 
        if (item == null) {
          this._mailService.updateShortUserList();
        }
        else {
          this.userListItems = item;
        }
      }
    );

    this.fullControls = new FormGroup(
      {
        nameControl: new FormControl("", [this.validateEmail()]),
        subjectControl: new FormControl("", [Validators.required]),
        txtControl: new FormControl("", [Validators.required])
      }
    ); 
    this.formChangeSubscribe = this.fullControls.valueChanges.subscribe((item) => {this.canDeactivateVal = false});        
  }

  validateEmail () {
    return function (formControl: FormControl) {
      let val: string = formControl.value.trim();
      val = val.substr(val.lastIndexOf(" ") + 1);
      val = val.replace("<", "").replace(">", "");
      if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(val)) {
        return null;
      }
      else {
        return {validateEmail: {message: 'Введите адрес электронной почты'}}
      }
    }
  }

  canDeactivate() {
    return this.canDeactivateVal;    
  }

  getClassByStatus(status: string) {
    if (status == "INVALID") {
      return "invalidInput";
    }
    return "";
  }

  moveToParent() {
    this.router.navigate(['/client/mailbox']);
  }

  addMessage() {
    this._mailService.addMessage(this.fullControls.value).subscribe((item: any) => {   
      this._mailService.changeCountMessageFlag(true);   
      if (item == "true") {
        this._mailService.setShortUserList(null);
      }
      this.canDeactivateVal = true;
      this.router.navigate(["../"], {relativeTo: this.route});
    });
  }

}
