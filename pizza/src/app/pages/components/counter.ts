import {Component, OnInit, Input} from "@angular/core";
import {PanierProvider} from "../../panier.provider";



@Component({
    selector:"pizza-counter",
    templateUrl:"./counter.html",
    styleUrls:['./counter.scss']
})
export class Counter{
    @Input() pizzaid;//identifiant de la pizza associée a ce counter 
    @Input() prixsmall;//identifiant de la pizza associée a ce counter 
    @Input() prixbig;//identifiant de la pizza associée a ce counter 

    constructor(private _panier:PanierProvider){}

    small_count:number = 0;
    big_count:number = 0;

    ngOnInit(){
        //recupere le panier pour cette pizza
        let card = this._panier.getPizzaCard(this.pizzaid);
        this.small_count = card[0];
        this.big_count = card[1];
    }
    addSmall(){
        this.small_count ++;
        this._panier.addToCard(this.pizzaid,0,this.small_count);
    }
    deleteSmall(){
        if(this.small_count>0){
            this.small_count --;
            this._panier.addToCard(this.pizzaid,0,this.small_count);
        }
        
    }
    addBig(){
        this.big_count ++;
        this._panier.addToCard(this.pizzaid,1,this.big_count);
    }
    deleteBig(){
        if(this.big_count>0){
            this.big_count --;
            this._panier.addToCard(this.pizzaid,1,this.big_count);
        }
    }


}