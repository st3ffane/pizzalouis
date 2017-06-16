import {Component, OnInit} from "@angular/core";
import {WSProvider} from "../../shared/ws/ws.provider";
import {Router} from "@angular/router";

import {Page} from "ui/page";

@Component({
    selector:"pizza-details",
    templateUrl:`pages/details/details.html`,
  styleUrls: ["pages/details/details.css"]
})
export class DetailsComponent implements OnInit{

  
    pizza:any;
    is_processing:boolean = false;

    constructor(page:Page, private _ws:WSProvider, private _router:Router ){
     page.actionBarHidden = true;//full screen page
    }
    
  ngOnInit(){
    this.is_processing = true;
    //recupere la liste des pizzas
    
  }

  
}