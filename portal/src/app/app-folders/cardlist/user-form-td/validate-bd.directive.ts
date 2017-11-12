import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

function validateBd(control) {
  if (control.value == null) { return {validateBD: {message: 'Ещё нет 18 лет'}}; }

  let minYears: number = 18;
  let etYears: Date = new Date(); 
  
  etYears.setFullYear(etYears.getFullYear() - minYears);
  if (new Date(Date.parse(control.value))<etYears) {
    return null;
  }
  else {
    return {validateBD: {message: 'Ещё нет 18 лет'}};
  }
}

@Directive({
  selector: '[appValidateBd][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: validateBd,
      multi: true
    }
  ]
})
export class ValidateBdDirective {

  constructor() { }

}
