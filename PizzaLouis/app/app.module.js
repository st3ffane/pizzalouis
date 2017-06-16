"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
var app_routing_1 = require("./app.routing");
var citation_pipe_1 = require("./pipes/citation.pipe");
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
        declarations: [app_component_1.AppComponent, citation_pipe_1.CitationPipe].concat(app_routing_1.navigableComponents),
        providers: [ws_provider_1.WSProvider],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFDbkUsc0RBQXVFO0FBQ3ZFLDZDQUE0RDtBQUU1RCx1REFBbUQ7QUFHbkQsaURBQStDO0FBRS9DLG1DQUFpQztBQUVqQyx1REFBcUQ7QUFhckQsSUFBYSxTQUFTO0lBQXRCO0lBQXdCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBekIsSUFBeUI7QUFBWixTQUFTO0lBWHJCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHdDQUFrQjtZQUNuQiwrQkFBdUI7WUFDdkIsNkJBQXNCO1lBQ3RCLGlDQUF3QjtZQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztTQUN2QztRQUNWLFlBQVksR0FBRyw0QkFBWSxFQUFDLDRCQUFZLFNBQUksaUNBQW1CLENBQUM7UUFDaEUsU0FBUyxFQUFDLENBQUMsd0JBQVUsQ0FBQztRQUN0QixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuXG5pbXBvcnQge0NpdGF0aW9uUGlwZX0gZnJvbSBcIi4vcGlwZXMvY2l0YXRpb24ucGlwZVwiO1xuXG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuaW1wb3J0IFwiLi9zaGFyZWQvcnhqcy1vcGVyYXRvcnNcIjtcblxuaW1wb3J0IHsgV1NQcm92aWRlciB9IGZyb20gXCIuL3NoYXJlZC93cy93cy5wcm92aWRlclwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLC8vbmUgcGFzIG91YmxpZXIgY2VsdWkgbGEhISFcbiAgICAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKVxuICAgICAgICAgICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnQsQ2l0YXRpb25QaXBlLC4uLm5hdmlnYWJsZUNvbXBvbmVudHNdLFxuICBwcm92aWRlcnM6W1dTUHJvdmlkZXJdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIl19