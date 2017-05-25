import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

/**
 * Provider d'acces au webservice du site pizzas
 */

@Injectable()
export class WSProvider{
    auth_token:string = null;//par defaut, non identifier

    constructor(private _http:Http){}

    public setAuthInfos(infos){
        this.auth_token = infos.token;

    }
    public isAuthenticate():boolean{return this.auth_token!=null;}
    public login(name, password):Promise<any>{
        return this.sendToServer("/api/login","post",{name:name, password:password});
    }
    public createUser(name, email):Promise<any>{
        return this._http.post("/api/createuser",{name:name, password:email}).toPromise();
    }
    private sendToServer(url, method, datas:any):Promise<any>{
        return this._http[method](url,datas).toPromise();
    }
}