import { Pipe } from '@angular/core';
import {WSProvider} from "../shared/ws/ws.provider";


@Pipe({name: 'tourl'})
export class ToUrlPipe {
  constructor(private _ws:WSProvider){}

  transform(url:string, path:string = "/images/pizzas/") {
    
    
    let cible =  this._ws.SERVER_URL+path+url;
    console.log(cible);
    return cible;
  }
}