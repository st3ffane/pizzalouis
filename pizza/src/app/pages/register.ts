import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";
import {Router} from "@angular/router";

@Component({
    selector:"pizza-register",
    templateUrl:"./register.html",
    styleUrls:['./register.scss']
})
export default class RegisterComponent{

    name:string;
    email:string;
    error:string = null;
    is_processing:boolean = false;

    constructor(private _ws:WSProvider, private _route:Router){}
    processRegister(){
        this.error = null;
        this.is_processing = true;
        this._ws.createUser(this.name,this.email).then( (dt)=>{
            //auth OK, recupere les infos 
            this._ws.setAuthInfos(dt);
            this.is_processing = false;
            //va ailleurs.... vers le main 
            this._route.navigate(['/main']);

        }).catch(err=>{
            this.error = "Erreur d'authentification";
            this.is_processing = false;
        });
    }
}