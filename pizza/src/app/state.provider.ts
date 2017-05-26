import {Injectable} from "@angular/core";

//pour les pages qui ont besoins de se souvenir ou elles étés
@Injectable()
export class StateProvider{

    private states = {};


    public savestate(key:string, datas:any){
        this.states[key] = datas;
    }
    public loadstate(key){
        return this.states[key] || {};
    }

}