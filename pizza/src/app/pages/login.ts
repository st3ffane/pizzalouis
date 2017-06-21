import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";
import {Router} from "@angular/router";

@Component({
    selector:"pizza-login",
    templateUrl:"./login.html",
    styleUrls:['./login.scss']
})
export default class LoginComponent{

    name:string;
    password:string;
    is_processing:boolean = false;
    error:string = null;

    custom_server:string;

    constructor(private _ws:WSProvider, private _route:Router){}
    ngOnInit(){
        this._ws.setAuthInfos(null);
    }
    processAuth(){
        if(this.custom_server) this.setServerURL();
        
        this.error = null;
        this.is_processing = true;
        this._ws.login(this.name,this.password).then( (dt)=>{
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

    setServerURL(){
        this._ws.setServerIP(this.custom_server);
    }
}