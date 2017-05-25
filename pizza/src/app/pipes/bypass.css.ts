import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeCSS'})
export class BypassCSSPipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(url) {
    
    let transform = `background-image: url(/images/pizzas/${url});`;
    return this.sanitizer.bypassSecurityTrustStyle(transform);
  }
}