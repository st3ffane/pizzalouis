import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";


@Component({
    selector:"pizza-list",
    templateUrl:"./pizzas.list.html",
    styleUrls:['./pizzas.list.scss']
})
export default class PizzasListComponent{
    pizzas:Array<any> = [];
    error:string = null;



    constructor(private _ws:WSProvider){}
    ngOnInit(){
        this._ws.getPizzasList().then(dt=>{
            this.pizzas = dt;
            console.log(dt)

        }).catch(err=>{
            console.log(err);
        })
    }
}