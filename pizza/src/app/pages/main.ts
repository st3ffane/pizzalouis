import {Component} from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import {WSProvider} from "../ws.provider";
declare var ol: any;

@Component({
    selector:"pizza-main",
    templateUrl:"./main.html",
    styleUrls:['./main.scss']
})
export default class MainComponent{

    show_menu: boolean = false;//trigger menu ouverture

    last_news:any = null;
    offset:number = 0;
    hasmore:boolean = true;
    is_loading:boolean = false;


    constructor(private _ws:WSProvider){}
    ngOnInit(){
        //met en place les listeners???
        let map = new ol.Map({
            target: 'map',
            layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
            ],
            view: new ol.View({
            center: ol.proj.fromLonLat([-1.105356,43.669070]),
            zoom: 15
            })
        });


        let pos = ol.proj.fromLonLat([-1.105356,43.669070]);

        // Vienna marker
        let marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById('marker'),
            stopEvent: false
        });
        map.addOverlay(marker);

        this.is_loading = true;
        this._ws.loadLastNewsExcerpt(this.offset).then(dt=>{
            if(dt.last_news){
                this.last_news=dt.last_news;                
                this.hasmore = true;
            } else {
                this.hasmore = false;
            }
            this.is_loading=false;
        })
    }

    toggleMenu(evt){        
        this.show_menu = !this.show_menu;
        evt.preventDefault();
    }

    prevnews(id){
        this.offset = this.offset > 0 ? this.offset-1 : 0 ;
        this.is_loading = true;
        this._ws.loadLastNewsExcerpt(this.offset).then(dt=>{
            if(dt.last_news){
                this.last_news=dt.last_news;                
                this.hasmore = true;
            } else {
                this.hasmore = false;
                
            }
            this.is_loading=false;
        }).catch(err=>{

        })
    }
    nextnews(id){
        this.offset++;
        this.is_loading = true;
        this._ws.loadLastNewsExcerpt(this.offset).then(dt=>{
            if(dt.last_news){
                this.last_news=dt.last_news;                
                this.hasmore = true;
            } else {
                this.hasmore = false;
            }
            this.is_loading=false;
        }).catch(err=>{
            this.hasmore = false;
            this.offset--;
             this.is_loading=false;
        })
    }

    
    
}