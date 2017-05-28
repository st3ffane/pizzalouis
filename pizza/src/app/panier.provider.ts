import {Injectable} from "@angular/core";
import {WSProvider} from "./ws.provider";

@Injectable()
export class PanierProvider{
        panier:any = {
            location: {
                latitude:43.669070,
                longitude:-1.105356
            }
    };
    
    constructor(private _ws:WSProvider){}

    
    addToCard(id, type, count){
        //ajoute au panier
        if(!this.panier[id]){
            this.panier[id] = [0,0];//par defaut...
        }
        this.panier[id][type]=count;
        
        if(this.panier[id][0]== 0 && this.panier[id][1]==0){
            delete this.panier[id];
        }
    }

    getPizzaCard(id){
        return this.panier[id] || [0,0];        
    }

    getCardDetails(){
        console.log("ICI")
        //renvois les infos de la card
        
        return  this._ws.getPizzasList().then(dt=>{
             let pizzas = dt;
            let card = [];
            let total = 0;

            for (let pid in this.panier){
                let p = this.panier[pid];
                let pizza = this.getPizzaById(pid, pizzas);
                
                if(!pizza) continue;
                let com = {
                    id: pid,
                    pizza: pizza,
                    small: undefined,
                    big:undefined
                };
                if(p[0]>0){
                    total += p[0] * pizza.prix_small;
                    //ajoutte
                    com.small=p[0];
                }
                if(p[1]>0){
                    total += p[1] * pizza.prix_big;
                    //ajoutte
                    com.big=p[1];
                }
                card.push(com);

            }
            return {
                total: total,
                pizzas: card
            }
        });
        
    }

    private getPizzaById(id, pizzas){
        for (let p of pizzas){
            console.log(p)
            if(p && p.id == id) return p;
        }


    }
}