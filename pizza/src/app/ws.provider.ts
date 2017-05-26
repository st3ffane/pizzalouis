import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";


import { CanActivate }    from '@angular/router';
/**
 * Provider d'acces au webservice du site pizzas
 */

@Injectable()
export class WSProvider implements CanActivate{
    auth_token:string = null;//par defaut, non identifier

    constructor(private _http:Http, private _route:Router){}


    canActivate() {    
        console.log("Authenticated? ",this.isAuthenticate())
        if (this.isAuthenticate()) return true;
        else this._route.navigate(["/login"])
    }


    public setAuthInfos(infos){
        if(infos == null){
            this.auth_token = null;
            return;
        }
        console.log(infos.token)
        this.auth_token = infos.token.token;

    }
    public isAuthenticate():boolean{return this.auth_token!=null;}
   
   
   
   
    public login(name, password):Promise<any>{
        return this.sendToServer("/api/login","post",{name:name, password:password});
    }
    public createUser(name, email):Promise<any>{
        return this.sendToServer("/api/createuser","post",{name:name, password:email});
    }
    public loadUserDetails():Promise<any>{
        return this.sendGetToServer("/api/client/user");
    }
    public saveUserDetails(user:any):Promise<any>{
        return this.sendToServer("/api/client/user","post",user);
    }



    public loadLastNewsExcerpt(offset){
        return this.sendGetToServer("/api/client/lastnewsexcerpt?offset="+offset);
    }
    public loadNews(id){
        return this.sendGetToServer("/api/client/news/"+id);
    }
    public postNewsComment(id, msg){
        return this.sendToServer("/api/client/news/"+id,'post',{msg:msg});
    }



    public getPizzasList(){
        return this.sendGetToServer("/api/client/pizzas");
    }
    public loadPizza(id){
        return this.sendGetToServer("/api/client/pizzas/"+id);
    }
    public postPizzaComment(id, msg, note){
        return this.sendToServer("/api/client/pizzas/"+id,'post',{msg:msg, note:note});
    }
    private sendGetToServer(url,datas?:string){
        let headers =  new Headers({'Content-Type': 'application/json'});
        console.log("Authoticate: "+this.auth_token)
        if(this.auth_token){
            
            headers.append('Authorization', this.auth_token); // also tried other types to test if its working with other types, but no luck
        }
        

        return this._http.get(url,{ headers:headers}).toPromise().then(dt=>{
            let d = dt.json();
            console.log(d)
            if(!d) throw ("no datas");

            return d;  
        });
    }
    private sendToServer(url, method, datas?:any):Promise<any>{
        let headers =  new Headers({'Content-Type': 'application/json'});
        console.log("Authoticate: "+this.auth_token)
        if(this.auth_token){
            
            headers.append('Authorization', this.auth_token); // also tried other types to test if its working with other types, but no luck
        }
        

        return this._http.post(url,datas||{},{ headers:headers}).toPromise().then(dt=>{
            let d = dt.json();
            console.log(d)
            if(!d) throw ("no datas");

            return d;  
        });
    }
}