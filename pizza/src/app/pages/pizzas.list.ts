import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";
import {StateProvider} from "../state.provider";
import {Router, NavigationStart} from "@angular/router";

const KEY:string = "PIZZA_LIST";


@Component({
    selector:"pizza-list",
    templateUrl:"./pizzas.list.html",
    styleUrls:['./pizzas.list.scss']
})
export default class PizzasListComponent{
    pizzas:Array<any> = [];
    error:string = null;

    router_subscribe = null;


    constructor(private _router:Router,private _ws:WSProvider, private _state:StateProvider){}
    ngOnInit(){


        let state = this._state.loadstate(KEY);

        this.router_subscribe = this._router.events.subscribe((event) => {
            if(event instanceof NavigationStart) {
                this._state.savestate(KEY,{scrollY:document.documentElement.scrollTop || document.body.scrollTop});
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
        this._ws.getPizzasList().then(dt=>{
            this.pizzas = dt;
           //scroll back
           setTimeout(()=> window.scrollTo(0,state.scrollY || 0), 100);

        }).catch(err=>{
            console.log(err);
        })
    }
    ngOnDestroy(){
        this.router_subscribe.unsubscribe();
    }
}