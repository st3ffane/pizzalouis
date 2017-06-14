import { Component } from "@angular/core";
import {Page} from "ui/page";

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
  server_ip:string;
  login:string;
  passwrd:string;

  
  constructor(page:Page){
    page.actionBarHidden = true;//full screen page
  }

  submit(){
    alert("server ip: "+this.server_ip);
  }
}