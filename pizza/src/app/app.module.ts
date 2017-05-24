import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import Routes from "./router";
import AccueilComponent from "./pages/accueil";
import RegisterComponent from "./pages/register";
import MainComponent from "./pages/main";
import LoginComponent from "./pages/login";

import {WSProvider} from "./ws.provider";

@NgModule({
  declarations: [
    AppComponent,
    //les pages de l'application 
    AccueilComponent,
    RegisterComponent,
    MainComponent,
    LoginComponent
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
