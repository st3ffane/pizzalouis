import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

/**
 * Provider d'acces au webservice du site pizzas
 */

@Injectable()
export class WSProvider{


    constructor(private _http:Http){}
}