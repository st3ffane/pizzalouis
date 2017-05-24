import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import Routes from "./router";
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
    Routes
  ],
  providers: [WSProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
