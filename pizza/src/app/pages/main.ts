import {Component, Inject} from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import {WSProvider} from "../ws.provider";
import {StateProvider} from "../state.provider";
import {Router, NavigationStart} from "@angular/router";


declare var ol: any;
const KEY:string = "MAIN";


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

    router_subscribe = null;

    constructor(private _router:Router,private _ws:WSProvider, private _state:StateProvider){
        
    }
    ngOnInit(){
        //restaure l'etat de la page
        let state = this._state.loadstate(KEY);
        this.offset = state.offset || 0;
       
        this.router_subscribe = this._router.events.subscribe((event) => {
            if(event instanceof NavigationStart) {
                this._state.savestate(KEY,{scrollY:document.documentElement.scrollTop || document.body.scrollTop, offset:this.offset});
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });

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
        });
        
        setTimeout(()=> window.scrollTo(0,state.scrollY || 0), 100);
        
    }
    ngOnDestroy(){
        this.router_subscribe.unsubscribe();
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