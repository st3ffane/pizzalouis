"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ws_provider_1 = require("../../shared/ws/ws.provider");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var MainComponent = (function () {
    function MainComponent(page, _ws, _router) {
        this._ws = _ws;
        this._router = _router;
    }
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: "pizza-main",
        template: "<Label>Bonjour</Label>",
        styleUrls: []
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider, router_1.Router])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQsMENBQXVDO0FBRXZDLGdDQUE2QjtBQU83QixJQUFhLGFBQWE7SUFLdEIsdUJBQVksSUFBUyxFQUFVLEdBQWMsRUFBVSxPQUFjO1FBQXRDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFPO0lBRXZFLENBQUM7SUFFSCxvQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksYUFBYTtJQUx6QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFDLFlBQVk7UUFDckIsUUFBUSxFQUFDLHdCQUF3QjtRQUNuQyxTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7cUNBTW1CLFdBQUksRUFBYyx3QkFBVSxFQUFrQixlQUFNO0dBTDVELGFBQWEsQ0FTekI7QUFUWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtXU1Byb3ZpZGVyfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOlwicGl6emEtbWFpblwiLFxuICAgIHRlbXBsYXRlOmA8TGFiZWw+Qm9uam91cjwvTGFiZWw+YCxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBNYWluQ29tcG9uZW50e1xuXG4gIFxuXG5cbiAgICBjb25zdHJ1Y3RvcihwYWdlOlBhZ2UsIHByaXZhdGUgX3dzOldTUHJvdmlkZXIsIHByaXZhdGUgX3JvdXRlcjpSb3V0ZXIgKXtcbiAgICBcbiAgfVxuICBcbn0iXX0=