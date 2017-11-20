import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TSexValues } from '../../../comon';

@Component({
  selector: 'app-customsex',
  templateUrl: './customsex.component.html',
  styleUrls: ['./customsex.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomsexComponent),
      multi: true
    }
  ]
})
export class CustomsexComponent implements OnInit, ControlValueAccessor {
  private _currentVal: TSexValues = -1;  
  propageteChange = (val: TSexValues) => {};
  propageteTouch = (val: TSexValues) => {};

  constructor() { }

  get currentVal() {
    return this._currentVal;
  }

  set currentVal(val: TSexValues) {
    this._currentVal = val;
    this.propageteChange(val);
    this.propageteTouch(val);
  }

  writeValue(val: TSexValues): void {
    this.currentVal = val;
  };

  registerOnChange(fn: any): void {
    this.propageteChange = fn;
  };

  registerOnTouched(fn: any): void {
    this.propageteTouch = fn;
  };

  ngOnInit() {
  }

  switchSex(val: TSexValues) {
    this.currentVal = val;
  }
}
