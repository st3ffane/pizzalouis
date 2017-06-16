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
            to_url_pipe_1.ToUrlPipe].concat(app_routing_1.navigableComponents),
        providers: [ws_provider_1.WSProvider],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFDbkUsc0RBQXVFO0FBQ3ZFLDZDQUE0RDtBQUU1RCx1REFBbUQ7QUFDbkQsbURBQThDO0FBRTlDLGlEQUErQztBQUUvQyxtQ0FBaUM7QUFFakMsdURBQXFEO0FBZ0JyRCxJQUFhLFNBQVM7SUFBdEI7SUFBd0IsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUF6QixJQUF5QjtBQUFaLFNBQVM7SUFkckIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsd0NBQWtCO1lBQ25CLCtCQUF1QjtZQUN2Qiw2QkFBc0I7WUFDdEIsaUNBQXdCO1lBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1NBQ3ZDO1FBQ1YsWUFBWSxHQUFHLDRCQUFZO1lBQ25CLDRCQUFZO1lBQ1osdUJBQVMsU0FDTixpQ0FBbUIsQ0FBQztRQUMvQixTQUFTLEVBQUMsQ0FBQyx3QkFBVSxDQUFDO1FBQ3RCLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7S0FDMUIsQ0FBQztHQUNXLFNBQVMsQ0FBRztBQUFaLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbmltcG9ydCB7Q2l0YXRpb25QaXBlfSBmcm9tIFwiLi9waXBlcy9jaXRhdGlvbi5waXBlXCI7XG5pbXBvcnQge1RvVXJsUGlwZX0gZnJvbSBcIi4vcGlwZXMvdG8udXJsLnBpcGVcIjtcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgXCIuL3NoYXJlZC9yeGpzLW9wZXJhdG9yc1wiO1xuXG5pbXBvcnQgeyBXU1Byb3ZpZGVyIH0gZnJvbSBcIi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsLy9uZSBwYXMgb3VibGllciBjZWx1aSBsYSEhIVxuICAgICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXG4gICAgICAgICAgIF0sXG4gIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudCxcbiAgICAgICAgICBDaXRhdGlvblBpcGUsXG4gICAgICAgICAgVG9VcmxQaXBlLFxuICAgICAgICAgIC4uLm5hdmlnYWJsZUNvbXBvbmVudHNdLFxuICBwcm92aWRlcnM6W1dTUHJvdmlkZXJdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuIl19