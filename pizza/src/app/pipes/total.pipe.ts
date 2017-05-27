import { Pipe } from '@angular/core';

@Pipe({name: 'totalpizza'})
export class TotalPizzaPipe {
  constructor(){}

  transform(carditem) {
    let small = carditem.small || 0;
    let big = carditem.big || 0;


    
    return small*carditem.pizza.prix_small + big*carditem.pizza.prix_big;
  }
}