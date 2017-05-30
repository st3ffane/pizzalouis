import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

const MIN_STEP = 60000;
const HOUR_STEP = 60000*60;


function createCounterRangeValidator(maxValue, minValue) {
  return function validateCounterRange(c: FormControl) {
    let err = {
      rangeError: {
        given: c.value,
        max: maxValue,
        min: minValue
      }
    };

    return (c.value > maxValue || c.value < minValue) ? err: null;
  }
}

@Component({
  selector: 'counter-input',
  template: `
    <div class="timepicker">
	<div class="elem">
	<button class="btn btn-primary btn-lg" type="button" (click)="incrementHours()">+</button>
    	<span>{{counterValue?.getHours()}} H</span>
    <button  class="btn btn-lg" type="button" (click)="decrementHours()">-</button>
	</div>
	<div class="elem">
	
    <button  class="btn btn-primary btn-lg" type="button" (click)="incrementMin()">+</button>
    <span>{{counterValue?.getMinutes()}} Min</span>
    <button  class="btn btn-lg" type="button" (click)="decrementMin()">-</button>
</div>
</div>
  `,
  styleUrls:['./time.picker.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    },
    { 
      provide: NG_VALIDATORS,
      useValue: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ]
})
export default class TimePickerComponent implements ControlValueAccessor {

  @Input()
  _counterValue:Date = new Date();//heure, normalement une chaine?

  @Input()
  counterRangeMax;//heure maximale: 21h30
  mindate: Date;

  @Input()
  counterRangeMin;//heure minimale: 17h30 ou now()+30min
  maxdate:Date;

 ngOnInit() {
    this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    let now = new Date();//now + 30mins
    

    
    //calcule la date min et max
    if(this.counterRangeMin){
      //calcule par rapport a l'heure donnée
      let time = this.counterRangeMin.split(':');
      let td = new Date(now.getFullYear(), now.getMonth(),now.getDate(),+time[0], +time[1]);//nouvelle date
      
      this.mindate = td > now ? td : now;
      
    } else {
      this.mindate = new Date(now.getFullYear(), now.getMonth(),now.getDate(),0, 0);
    }

    if(this.counterRangeMax){
      //calcule par rapport a l'heure donnée
      let time = this.counterRangeMax.split(':');
      this.maxdate = new Date(now.getFullYear(), now.getMonth(),now.getDate(),+time[0], +time[1]);//nouvelle date
      
    }else {
      this.maxdate = new Date(now.getFullYear(), now.getMonth(),now.getDate(),23, 59);//nouvelle date
    }

    console.log("mindate:",this.mindate);
    console.log("maxdate:",this.maxdate);
    this._counterValue = this.mindate;
    console.log("init:",this._counterValue);
    
  }
  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    let dt = new Date(val);
    if(dt >= this.mindate && dt <= this.maxdate){
      this._counterValue = new Date(val);
    this.propagateChange(this._counterValue);
    }
    
  }

  

  incrementHours() {
    let dt = new Date(this._counterValue.getTime() + HOUR_STEP);
    
    if(dt <= this.maxdate){
      this._counterValue =dt;
      this.propagateChange(this._counterValue);
    }
    
  }

  decrementHours() {
    let dt = new Date(this._counterValue.getTime() - HOUR_STEP);
    
    if(dt >= this.mindate ){
      this._counterValue = dt;
      this.propagateChange(this._counterValue);
    }
  }
  incrementMin() {
    let dt = new Date(this._counterValue.getTime() + MIN_STEP);
    if(dt <= this.maxdate){
      this._counterValue =dt;
      this.propagateChange(this._counterValue);
    }
  }

  decrementMin() {
    let dt = new Date(this._counterValue.getTime() - MIN_STEP);
    if(dt >= this.mindate){
      this._counterValue =dt;
      this.propagateChange(this._counterValue);
    }
  }


  writeValue(value: any) {
    if (value !== undefined) {
        this.counterValue = value;
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  validateFn:Function;
  ngOnChanges(changes) {
    if (changes.counterRangeMin || changes.counterRangeMax) {
      this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    }
  }
 

  validate(c: FormControl) {
    return true;//this.validateFn(c);
  }
}