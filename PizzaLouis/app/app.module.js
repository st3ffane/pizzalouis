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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFDbkUsc0RBQXVFO0FBTXZFLDZDQUE0RDtBQUU1RCx1REFBbUQ7QUFDbkQsbURBQThDO0FBQzlDLHFDQUE4QztBQUU5QyxpREFBK0M7QUFFL0MsbUNBQWlDO0FBRWpDLHVEQUFxRDtBQW1CckQsSUFBYSxTQUFTO0lBQXRCO0lBQXdCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBekIsSUFBeUI7QUFBWixTQUFTO0lBakJyQixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0I7WUFDbkIsK0JBQXVCO1lBQ3ZCLDZCQUFzQjtZQUN0QixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7U0FDdkM7UUFDVixZQUFZLEdBQUcsNEJBQVk7WUFDbkIsNEJBQVk7WUFDWix1QkFBUztZQUNULHVCQUFnQixTQUdiLGlDQUFtQixDQUFDO1FBQy9CLFNBQVMsRUFBQyxDQUFDLHdCQUFVLENBQUM7UUFDdEIsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO0dBQ1csU0FBUyxDQUFHO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcblxuXG5cbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbmltcG9ydCB7Q2l0YXRpb25QaXBlfSBmcm9tIFwiLi9waXBlcy9jaXRhdGlvbi5waXBlXCI7XG5pbXBvcnQge1RvVXJsUGlwZX0gZnJvbSBcIi4vcGlwZXMvdG8udXJsLnBpcGVcIjtcbmltcG9ydCB7UmVhZGFibGVEYXRlUGlwZX0gZnJvbSBcIi4vcGlwZXMvZGF0ZVwiO1xuaW1wb3J0IHtQaXp6YVBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9wYWdlcy9waWNrZXIvcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbmltcG9ydCBcIi4vc2hhcmVkL3J4anMtb3BlcmF0b3JzXCI7XG5cbmltcG9ydCB7IFdTUHJvdmlkZXIgfSBmcm9tIFwiLi9zaGFyZWQvd3Mvd3MucHJvdmlkZXJcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSwvL25lIHBhcyBvdWJsaWVyIGNlbHVpIGxhISEhXG4gICAgICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcylcbiAgICAgICAgICAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LFxuICAgICAgICAgIENpdGF0aW9uUGlwZSxcbiAgICAgICAgICBUb1VybFBpcGUsXG4gICAgICAgICAgUmVhZGFibGVEYXRlUGlwZSxcbiAgICAgICAgICBcbiAgICAgICAgICBcbiAgICAgICAgICAuLi5uYXZpZ2FibGVDb21wb25lbnRzXSxcbiAgcHJvdmlkZXJzOltXU1Byb3ZpZGVyXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==