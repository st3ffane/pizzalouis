import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
 
import { AppComponent } from './app.component';
import {Routing} from "./router";
import {PAGES} from './pages/pages';

import {WSProvider} from "./ws.provider";

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [WSProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
