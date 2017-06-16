import {Component, OnInit} from "@angular/core";
import {WSProvider} from "../../shared/ws/ws.provider";
import {Router} from "@angular/router";

import {Page} from "ui/page";

@Component({
    selector:"pizza-main",
    templateUrl:`pages/main/main.html`,
  styleUrls: ["pages/main/main.css"]
})
export class MainComponent implements OnInit{

  
    pizzas:Array<any> = [];
    is_processing:boolean = false;

    constructor(page:Page, private _ws:WSProvider, private _router:Router ){
     page.actionBarHidden = true;//full screen page
    }
    
  ngOnInit(){
    this.is_processing = true;
    //recupere la liste des pizzas
    this._ws.getPizzasList().then(dt=>{
      this.is_processing = false;
      this.pizzas = dt;

    }).catch(err=>{
      console.log(err);//TODO
      this.is_processing = false;
    })
  }

  showPizzaDetails(evt){
    
  }
  
}