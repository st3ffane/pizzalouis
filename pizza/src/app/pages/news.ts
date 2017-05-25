import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
    selector:"pizza-news",
    templateUrl:"./news.html",
    styleUrls:['./news.scss']
})
export default class NewsComponent{
    news:any = null;
    error: string = null;

    is_processing: boolean = false;
    success:boolean = false;
    msg_text:string = null;

    
    constructor(private _ws:WSProvider, private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        window.scrollTo(0,0);
        //chargement de la news 
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this._ws.loadNews(id).then(dt=>{
                this.news = dt;
            }).catch(err=>{
                this.error = "Error retreiving news datas";
            })
        });
    }

    processForm(){
        //post le message
    }
}