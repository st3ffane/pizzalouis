import { Pipe } from '@angular/core';

@Pipe({name: 'citation'})
export class CitationPipe {
  constructor(){}

  transform(ph) {
    
    
    return '"'+ph+'"';
  }
}