import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {WSProvider} from "../ws.provider";

@Pipe({name: 'safeCSS'})
export class BypassCSSPipe {
  constructor(private sanitizer:DomSanitizer, private _ws:WSProvider){}

  transform(url) {
    let cible =  this._ws.SERVER_URL;
    let transform = `background-image: url(${cible}/images/pizzas/${url});`;
    return this.sanitizer.bypassSecurityTrustStyle(transform);
  }
}