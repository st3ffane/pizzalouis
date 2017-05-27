import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
 
import { AppComponent } from './app.component';
import {Routing} from "./router";
import {PAGES} from './pages/pages';
import "./rxjs-operators";
import {WSProvider} from "./ws.provider";
import {StateProvider} from "./state.provider";
import {PanierProvider} from "./panier.provider";


import {ReadableDatePipe} from "./pipes/date";
import {BypassCSSPipe} from "./pipes/bypass.css";
import {TotalPizzaPipe} from "./pipes/total.pipe";


@NgModule({
  declarations: [
    AppComponent,
    BypassCSSPipe,
    ReadableDatePipe,
    TotalPizzaPipe,
    //les pages de l'application 
    ...PAGES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PageScrollModule.forRoot(),
    Routing
  ],
  providers: [WSProvider,StateProvider, PanierProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
