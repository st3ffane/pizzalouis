import { Component } from "@angular/core";
import {Page} from "ui/page";
import { Color } from "color";

import {Router} from "@angular/router";
import { WSProvider } from "../../shared/ws/ws.provider";

import {GREEN} from "../../shared/colors";

@Component({
  selector: "pizza-login",
  template: `
  <StackLayout>
    <StackLayout>
      <Label class="title" text="Pizzas Louis"></Label>
      <Label textWrap="true" class="slogan" text="la passion de la véritable pizza artisanale."></Label>
    </StackLayout>
    <StackLayout class="shrink">
    <TextField style.placeholderColor="white" hint="server local ip" [(ngModel)]="server_ip"
      autocorrect="false" autocapitalizationType="none"></TextField>
    <TextField hint="Login" style.placeholderColor="white" [(ngModel)]="login"
      autocorrect="false" autocapitalizationType="none"></TextField>
    <TextField style.placeholderColor="white" hint="Password" secure="true" [(ngModel)]="passwrd"></TextField>
     </StackLayout>
    <ActivityIndicator [busy]="is_processing" [visibility]="is_processing ? 'visible' : 'collapse'" row="1" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    <StackLayout [visibility]="is_processing ? 'collapse' : 'visible'">
      <Button text="Connectez vous"  class="submit-button" (tap)="submit()"></Button>
      <Button text="ou Créez votre compte gratuitement" [nsRouterLink]="['/register']" pageTransition="flip" ></Button>
    </StackLayout>
   
  </StackLayout>
  `,
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {
  server_ip:string = "192.168.1.16";
  login:string;
  passwrd:string;

  error:string;
  is_processing:boolean = false;
  
  constructor(page:Page, private _ws:WSProvider, private _router:Router ){
    page.actionBarHidden = true;//full screen page
    page.backgroundColor = GREEN//green
  }

  submit(){
    this.is_processing = true;
    this._ws.setServerIP(this.server_ip);//@DEBUG ONLY
    this._ws.login(this.login,this.passwrd).then(dt=>{
        //auth OK, recupere les infos 
            this._ws.setAuthInfos(dt);
            
            console.log("navigate to main")
            //va ailleurs.... vers le main 
            this._router.navigate(['/main', {
                transition: {
                    name: "flip",
                    duration: 2000,
                    curve: "linear"
                }
            }]);
            this.is_processing = false;

        }).catch(err=>{
            this.error = "Erreur d'authentification";
            alert(this.error);
            this.login="";
            this.passwrd="";
            this.is_processing = false;
        });
  }
}