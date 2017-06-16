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

    constructor(page:Page, private _ws:WSProvider, private _router:Router ){
     page.actionBarHidden = true;//full screen page
    }
    
  ngOnInit(){
    //recupere la liste des pizzas
    this._ws.getPizzasList().then(dt=>{
      console.log(dt);//pour etre sur....
      this.pizzas = dt;

    }).catch(err=>{
      console.log(err);//TODO
    })
  }

  showPizzaDetails(evt){
    
  }
  
}