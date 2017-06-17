"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
var app_routing_1 = require("./app.routing");
var citation_pipe_1 = require("./pipes/citation.pipe");
var to_url_pipe_1 = require("./pipes/to.url.pipe");
var date_1 = require("./pipes/date");
var app_component_1 = require("./app.component");
require("./shared/rxjs-operators");
var ws_provider_1 = require("./shared/ws/ws.provider");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        declarations: [app_component_1.AppComponent,
            citation_pipe_1.CitationPipe,
            to_url_pipe_1.ToUrlPipe,
            date_1.ReadableDatePipe].concat(app_routing_1.navigableComponents),
        providers: [ws_provider_1.WSProvider],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFDbkUsc0RBQXVFO0FBTXZFLDZDQUE0RDtBQUU1RCx1REFBbUQ7QUFDbkQsbURBQThDO0FBQzlDLHFDQUE4QztBQUc5QyxpREFBK0M7QUFFL0MsbUNBQWlDO0FBRWpDLHVEQUFxRDtBQWlCckQsSUFBYSxTQUFTO0lBQXRCO0lBQXdCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBekIsSUFBeUI7QUFBWixTQUFTO0lBZnJCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHdDQUFrQjtZQUNuQiwrQkFBdUI7WUFDdkIsNkJBQXNCO1lBQ3RCLGlDQUF3QjtZQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztTQUN2QztRQUNWLFlBQVksR0FBRyw0QkFBWTtZQUNuQiw0QkFBWTtZQUNaLHVCQUFTO1lBQ1QsdUJBQWdCLFNBQ2IsaUNBQW1CLENBQUM7UUFDL0IsU0FBUyxFQUFDLENBQUMsd0JBQVUsQ0FBQztRQUN0QixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEJvcmRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiO1xuXG5cblxuaW1wb3J0IHsgcm91dGVzLCBuYXZpZ2FibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcblxuaW1wb3J0IHtDaXRhdGlvblBpcGV9IGZyb20gXCIuL3BpcGVzL2NpdGF0aW9uLnBpcGVcIjtcbmltcG9ydCB7VG9VcmxQaXBlfSBmcm9tIFwiLi9waXBlcy90by51cmwucGlwZVwiO1xuaW1wb3J0IHtSZWFkYWJsZURhdGVQaXBlfSBmcm9tIFwiLi9waXBlcy9kYXRlXCI7XG5cblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgXCIuL3NoYXJlZC9yeGpzLW9wZXJhdG9yc1wiO1xuXG5pbXBvcnQgeyBXU1Byb3ZpZGVyIH0gZnJvbSBcIi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsLy9uZSBwYXMgb3VibGllciBjZWx1aSBsYSEhIVxuICAgICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXG4gICAgICAgICAgIF0sXG4gIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudCxcbiAgICAgICAgICBDaXRhdGlvblBpcGUsXG4gICAgICAgICAgVG9VcmxQaXBlLFxuICAgICAgICAgIFJlYWRhYmxlRGF0ZVBpcGUsXG4gICAgICAgICAgLi4ubmF2aWdhYmxlQ29tcG9uZW50c10sXG4gIHByb3ZpZGVyczpbV1NQcm92aWRlcl0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=