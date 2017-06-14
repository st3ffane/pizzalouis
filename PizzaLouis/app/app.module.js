"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
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
        imports: [nativescript_module_1.NativeScriptModule, forms_1.NativeScriptFormsModule, http_1.NativeScriptHttpModule],
        declarations: [app_component_1.AppComponent],
        providers: [ws_provider_1.WSProvider],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFHbkUsaURBQStDO0FBRS9DLG1DQUFpQztBQUVqQyx1REFBcUQ7QUFRckQsSUFBYSxTQUFTO0lBQXRCO0lBQXdCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBekIsSUFBeUI7QUFBWixTQUFTO0lBTnJCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHdDQUFrQixFQUFFLCtCQUF1QixFQUFFLDZCQUFzQixDQUFDO1FBQzlFLFlBQVksRUFBRSxDQUFDLDRCQUFZLENBQUM7UUFDNUIsU0FBUyxFQUFDLENBQUMsd0JBQVUsQ0FBQztRQUN0QixTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5cblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgXCIuL3NoYXJlZC9yeGpzLW9wZXJhdG9yc1wiO1xuXG5pbXBvcnQgeyBXU1Byb3ZpZGVyIH0gZnJvbSBcIi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRNb2R1bGUsIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLCBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOltXU1Byb3ZpZGVyXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==