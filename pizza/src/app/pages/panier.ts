import {Component} from "@angular/core";
import {PanierProvider} from "../panier.provider";
import {WSProvider} from "../ws.provider";
import {Router} from "@angular/router";


declare var braintree: any;//paypal

@Component({
    selector:"pizza-panier",
    templateUrl:"./panier.html",
    styleUrls:['./panier.scss']
})
export default class PanierComponent{

    card: any = {};
    retrait="17:30:00";//heure de retrait 
    date_error = "";
    message:string = "";//message complémentaire


    show_checkout:boolean = false;
    instance:any;
    
    constructor(private _panier:PanierProvider, private _ws:WSProvider, private _router:Router){}
    ngOnInit(){
        window.scrollTo(0,0);
        this._panier.getCardDetails().then(dt=>{
            this.card = dt;  
        });
    }

    processForm(){
        this.date_error = "";

        if(this.retrait < "17:30" || this.retrait > "21:30"){
            this.date_error = "Les horaires d'ouvertures sont compris entre 17h30 et 21h30.";
            this.retrait = "17:30";
            return;
        }

        //lance paypal????
        
        this.instance.requestPaymentMethod((requestPaymentMethodErr, payload)=> {
          // Submit payload.nonce to your server
          console.log(payload.nonce);
          this._ws.postCommand("fake-valid-nonce", this.card).then( dt=>{
                    //tout est OK, file a la derniere page
                    this._router.navigate(['/complete']);
                }).catch(err=>{
                    console.log(err);
                });


        });
      
        
    }
    openCheckout(){
        if(this.card.total == 0) return;

        //recupere un token du serveur 
        this._ws.getClientToken().then( dt=>{
            
            braintree.dropin.create({
            authorization: dt.token,
            selector: '#dropin-container'
            }, (err, instance) => {
                if(err){
                    console.log("Erreur recuperation du checkout....")
                    console.log(err);
                    this.show_checkout = false;
                    return;
                }

                this.instance = instance;
                //
                /*
                //balance le resultat au serveur
                this._ws.postCommand(instance.payment_method_nonce, this.card).then( dt=>{
                    //tout est OK, file a la derniere page
                    this._router.navigate(['/complete']);
                }).catch(err=>{
                    console.log(err);
                });*/
                
            });
        });
        
      
       this.show_checkout = true;
    }
}