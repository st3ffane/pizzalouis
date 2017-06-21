import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { Border } from "tns-core-modules/ui/border";



import { routes, navigableComponents } from "./app.routing";

import {CitationPipe} from "./pipes/citation.pipe";
import {ToUrlPipe} from "./pipes/to.url.pipe";
import {ReadableDatePipe} from "./pipes/date";
import {PizzaPickerComponent} from './pages/picker/picker.component';
import { AppComponent } from "./app.component";

import "./shared/rxjs-operators";

import { WSProvider } from "./shared/ws/ws.provider";

@NgModule({
  imports: [NativeScriptModule,
           NativeScriptFormsModule,
           NativeScriptHttpModule,
           NativeScriptRouterModule,//ne pas oublier celui la!!!
           NativeScriptRouterModule.forRoot(routes)
           ],
  declarations: [AppComponent,
          CitationPipe,
          ToUrlPipe,
          ReadableDatePipe,
          
          
          ...navigableComponents],
  providers:[WSProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
