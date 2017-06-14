import { Component } from "@angular/core";
import {Page} from "ui/page";

import { WSProvider } from "./shared/ws/ws.provider";
@Component({
  selector: "my-app",
  template: `
  <StackLayout>
  <TextField hint="server local ip" [(ngModel)]="server_ip"
      autocorrect="false" autocapitalizationType="none"></TextField>
    <TextField hint="Login" [(ngModel)]="login"
      autocorrect="false" autocapitalizationType="none"></TextField>
    <TextField hint="Password" secure="true" [(ngModel)]="passwrd"></TextField>

    <Button text="Connectez vous"  class="submit-button" (tap)="submit()"></Button>
    <Button text="ou Créez votre compte gratuitement" (tap)="toggleDisplay()"></Button>
  </StackLayout>
  `,
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class AppComponent {
  server_ip:string = "192.168.1.16";
  login:string;
  passwrd:string;

  error:string;
  is_processing:boolean = false;
  
  constructor(page:Page, private _ws:WSProvider ){
    page.actionBarHidden = true;//full screen page
  }

  submit(){
    console.log("tente le login");
    this._ws.setServerIP(this.server_ip);//@DEBUG ONLY
    this._ws.login(this.login,this.passwrd).then(dt=>{
        //auth OK, recupere les infos 
            this._ws.setAuthInfos(dt);
            this.is_processing = false;
            //va ailleurs.... vers le main 
            //this._route.navigate(['/main']);

        }).catch(err=>{
            this.error = "Erreur d'authentification";
            this.is_processing = false;
        });
  }
}