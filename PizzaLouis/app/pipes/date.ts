import { Pipe } from '@angular/core';

@Pipe({name: 'readableDate'})
export class ReadableDatePipe {
  constructor(){}

  transform(date) {
    let d = new Date(date);
    let v = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    
    return v;
  }
}