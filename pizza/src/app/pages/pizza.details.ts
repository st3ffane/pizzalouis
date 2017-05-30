import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PanierProvider} from "../panier.provider";


@Component({
    selector:"pizza-details",
    templateUrl:"./pizzas.details.html",
    styleUrls:['./pizzas.details.scss']
})
export default class PizzaDetailsComponent{

    pizza:any = null;
    error: string = null;

    is_processing: boolean = false;
    success:boolean = false;


    msg_text:string = null;
    note:string = "4";//par defaut
    toolate:boolean=false;


    constructor(private _ws:WSProvider, private activatedRoute: ActivatedRoute, private _card:PanierProvider){}

    ngOnInit(){
        this.toolate = this._ws.toolate;
        

        window.scrollTo(0,0);
        //chargement de la news 
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this._ws.loadPizza(id).then(dt=>{
                this.pizza = dt;
            }).catch(err=>{
                this.error = "Error retreiving news datas";
            })
        });
    }

    processForm(){
        //post le message
        if(this.pizza){
            this.is_processing = true;
            console.log(this.note);
            this._ws.postPizzaComment(this.pizza.id, this.msg_text, this.note).then(dt=>{
                if(dt.error == 0) this.success = true;
                else this.error = "Erreur lors de l'enregistrement de votre comment";
                this.is_processing = false;
            }).catch(err=>{
                this.error = "Erreur lors de l'enregistrement de votre comment";
                this.is_processing = false;
            })
        }
    }

     hasitems():boolean{
        return Object.keys(this._card.panier).length>0;
    }
}