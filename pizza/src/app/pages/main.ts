import {Component} from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

declare var ol: any;

@Component({
    selector:"pizza-main",
    templateUrl:"./main.html",
    styleUrls:['./main.scss']
})
export default class MainComponent{

    show_menu: boolean = false;//trigger menu ouverture

    constructor(){}
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
    }

    toggleMenu(evt){        
        this.show_menu = !this.show_menu;
        evt.preventDefault();
    }
    
}