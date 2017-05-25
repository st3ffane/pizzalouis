import {Component} from "@angular/core";
import {WSProvider} from "../ws.provider";



@Component({
    selector:"pizza-compte",
    templateUrl:"./compte.html",
    styleUrls:['./compte.scss']
})
export default class CompteComponent{

    is_loading: boolean = true;
    is_processing:boolean = false;
    error: string = null;
    message: string = null;
    userInfos:any = null;



    constructor(private _ws:WSProvider){

    }
    ngOnInit(){
        this.error = null;
        this.is_loading = true;
        this._ws.loadUserDetails().then(dt=>{
            //charge els données
            this.userInfos = dt.userInfos;
            console.log(this.userInfos);
            this.is_loading = false;
        }).catch(err=>{
            this.is_loading = false;
            this.error = err.msg;
        })
    }

    processForm(){
        this.error = null;
        this.is_processing = true;
        this._ws.saveUserDetails(this.userInfos).then(dt=>{
            this.is_processing = false;
            this.message = "Modifications enregistrées!";
            
        }).catch(err=>{
            this.error = "Erreur lors de l'enregistrement des données";
            this.is_processing = false;
        })
    }
}