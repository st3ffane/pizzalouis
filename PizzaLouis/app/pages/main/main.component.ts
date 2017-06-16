import {Component} from "@angular/core";
import {WSProvider} from "../../shared/ws/ws.provider";
import {Router} from "@angular/router";

import {Page} from "ui/page";

@Component({
    selector:"pizza-main",
    template:`<Label>Bonjour</Label>`,
  styleUrls: []
})
export class MainComponent{

  


    constructor(page:Page, private _ws:WSProvider, private _router:Router ){
    
  }
  
}