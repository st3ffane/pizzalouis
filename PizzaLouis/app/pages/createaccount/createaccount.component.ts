import {Component} from "@angular/core";
import {WSProvider} from "../../shared/ws/ws.provider";
import {Router} from "@angular/router";

import {Page} from "ui/page";

@Component({
    selector:"pizza-main",
    template:`
    <ScrollView>
    <StackLayout class="shrink">
    <StackLayout>
      <Label class="title" text="CREER UN COMPTE"></Label>
      <Label textWrap="true" class="slogan" text="Rien de plus simple! Il vous suffit de remplir le formulaire ci-dessous, et c'est tout."></Label>
    </StackLayout>
    <StackLayout>
    
    <TextField hint="Entrez votre prénom, il vous servira de login" [(ngModel)]="login"
      autocorrect="false" autocapitalizationType="none"></TextField>
    <TextField hint="Votre adresse mail vous servira de mot de passe"  [(ngModel)]="passwrd"></TextField>
     </StackLayout>
    <ActivityIndicator [busy]="is_processing" [visibility]="is_processing ? 'visible' : 'collapse'" row="1" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    
      <Button text="CREER VOTRE COMPTE" [visibility]="is_processing ? 'collapse' : 'visible'"  (tap)="submit()"></Button>
      
   
  </StackLayout>
  </ScrollView>`,
  styleUrls: ["pages/createaccount/create.css"]
})
export class CreateAccountComponent{

    login:string;
  passwrd:string;

  error:string;
  is_processing:boolean = false;


    constructor(page:Page, private _ws:WSProvider, private _router:Router ){
    page.actionBarHidden = true;//full screen page
  }
  submit(){


    this.is_processing = true;
    this._ws.createUser(this.login,this.passwrd).then(dt=>{
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