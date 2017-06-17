import {Component, OnInit} from "@angular/core";
import {WSProvider} from "../../shared/ws/ws.provider";
import {ActivatedRoute, Params} from "@angular/router";

import {Page} from "ui/page";
import { ListPicker } from "ui/list-picker";
import * as Toast from 'nativescript-toast';


@Component({
    selector:"pizza-details",
    templateUrl:`pages/details/details.html`,
  styleUrls: ["pages/main/main.css","pages/details/details.css"]
})
export class DetailsComponent implements OnInit{

  
    pizza:any;
    is_processing:boolean = false;
    is_sending:boolean = false;
    error:string;

    constructor(page:Page, private _ws:WSProvider, private activatedRoute: ActivatedRoute, ){
     page.actionBarHidden = true;//full screen page
     this.activatedRoute.params.subscribe((params: Params) => {
         this.is_processing = true;
            let id = params['id'];
            this._ws.loadPizza(id).then(dt=>{
                this.pizza = dt;
                this.is_processing = false;
            }).catch(err=>{
                this.error = "Error retreiving news datas";
                this.is_processing = false;
            })
        });
    }
    
  ngOnInit(){
    
    //recupere la liste des pizzas
    
  }
  notes:Array<String> = ["Bof","Passable","Bonne","Très bonne","Excellente!"]
  //pour le commentaire
  message:string = "";
  note:number = 5;

  selectedIndexChanged(evt){
    let picker = <ListPicker>evt.object;
    this.note = picker.selectedIndex +1;
  }
  sendMessage(){
      if(this.message != ''){
          //send message...
          this.is_sending=true;
          this._ws.postPizzaComment(this.pizza.id, this.message, this.note).then( dt=>{

            Toast.makeText("Merci pour votre commentaire...").show();
             this.is_sending = false;
          }).catch(err=>{
              console.log(err);
              this.is_sending = false;
          })
      }
  }

  
}