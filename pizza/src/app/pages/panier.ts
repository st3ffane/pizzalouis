import {Component} from "@angular/core";



@Component({
    selector:"pizza-panier",
    templateUrl:"./panier.html",
    styleUrls:['./panier.scss']
})
export default class PanierComponent{
    ngOnInit(){
        window.scrollTo(0,0);
    }
}