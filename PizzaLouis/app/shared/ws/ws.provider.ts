import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";
import 'rxjs/add/operator/toPromise';

import { CanActivate }    from '@angular/router';
/**
 * Provider d'acces au webservice du site pizzas
 */

@Injectable()
export class WSProvider implements CanActivate{
    auth_token:string = null;//par defaut, non identifier
    pizzas = [];//pour eviter des les recharger a chaque fois 
    location:any =  {
                latitude:43.669070,
                longitude:-1.105356
            };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                console.log(pos)
               this.location ={
                    latitude:pos.coords.latitude,
                    longitude:pos.coords.longitude
                };
            });
        }
    }

    toolate = false;
    private SERVER_URL = "";// "http://192.168.1.16:3000/";//pour les tests


    constructor(private _http:Http, private _route:Router){
        //this.getLocation();


        let now = new Date();
        let end = new Date(now.getFullYear(),now.getMonth(),now.getDate(), 21,30,0);//derniere commande 21h30
        this.toolate = now > end;//si true, ne peut plus faire de commande
       

        


    }
    setServerIP(ip){
        this.SERVER_URL = "http://"+ip+":3000";//enregistre @DEV ONLY
    }

    
    canActivate() {    
        
        if (this.isAuthenticate()) return true;
        else this._route.navigate(["/login"])
    }


    public setAuthInfos(infos){
        if(infos == null){
            this.auth_token = null;
            return;
        }
        console.log(infos.token.token)
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
        if(this.pizzas.length>0) return Promise.resolve(this.pizzas);
        return this.sendGetToServer("/api/client/pizzas").then(dt=>{
            this.pizzas = dt;
            return dt;
        });
    }
    public loadPizza(id){
        return this.sendGetToServer("/api/client/pizzas/"+id);
    }
    public postPizzaComment(id, msg, note){
        return this.sendToServer("/api/client/pizzas/"+id,'post',{msg:msg, note:note});
    }


    //PAYPAL: recupere un token client pour le paiement
    public getClientToken(){
        return this.sendGetToServer("/api/client/client_token");
    }

    private getPizzaById(id, pizzas){
        for (let p of pizzas){
            console.log(p)
            if(p && p.id == id) return p;
        }


    }

    public postCommand(payementid, card, date_retrait, message){
       
        //renvois les infos de la card       
        
            let pizzas = this.pizzas;
            let cardarr = [];
            
            console.log(card)
            for (let pizza of card.pizzas){
                
                
                console.log(pizza)
                let com = {
                    id: pizza.pizza.id,
                    nom: pizza.pizza.nom,
                    small: pizza.small,
                    big:pizza.big
                };
                
                cardarr.push(com);

            }
            //infos autre:
            let commande = {
                nonce: payementid,
                pizzas: cardarr,
                retrait: date_retrait,
                message: message,
                location: this.location
            }
    
        
        return this.sendToServer("/api/client/commande","post",commande);
    }


    
    private sendGetToServer(url,datas?:string){
        let headers =  new Headers({'Content-Type': 'application/json'});
        console.log("Authoticate: "+this.auth_token)
        if(this.auth_token){
            
            headers.append('Authorization', this.auth_token); // also tried other types to test if its working with other types, but no luck
        }
        

        return this._http.get(this.SERVER_URL+url,{ headers:headers}).toPromise().then(dt=>{
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
        

        return this._http.post(this.SERVER_URL+url,datas||{},{ headers:headers}).toPromise().then(dt=>{
            let d = dt.json();
            
            if(!d) throw ("no datas");

            return d;  
        });
    }
}