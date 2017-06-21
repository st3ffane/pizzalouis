import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
 import {APP_BASE_HREF} from '@angular/common';


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
import {ToUrlPipe} from "./pipes/to.url.pipe";

@NgModule({
  declarations: [
    AppComponent,
    BypassCSSPipe,
    ReadableDatePipe,
    TotalPizzaPipe,
    ToUrlPipe,
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
  providers: [WSProvider,StateProvider, PanierProvider, {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
