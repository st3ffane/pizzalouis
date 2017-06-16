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
        this.pizzas = [];
        this.is_processing = false;
        page.actionBarHidden = true; //full screen page
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.is_processing = true;
        //recupere la liste des pizzas
        this._ws.getPizzasList().then(function (dt) {
            _this.is_processing = false;
            _this.pizzas = dt;
        }).catch(function (err) {
            console.log(err); //TODO
            _this.is_processing = false;
        });
    };
    MainComponent.prototype.showPizzaDetails = function (evt) {
    };
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: "pizza-main",
        templateUrl: "pages/main/main.html",
        styleUrls: ["pages/main/main.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider, router_1.Router])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUNoRCwyREFBdUQ7QUFDdkQsMENBQXVDO0FBRXZDLGdDQUE2QjtBQU83QixJQUFhLGFBQWE7SUFNdEIsdUJBQVksSUFBUyxFQUFVLEdBQWMsRUFBVSxPQUFjO1FBQXRDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBSHJFLFdBQU0sR0FBYyxFQUFFLENBQUM7UUFDdkIsa0JBQWEsR0FBVyxLQUFLLENBQUM7UUFHN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQSxrQkFBa0I7SUFDL0MsQ0FBQztJQUVILGdDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDOUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxNQUFNO1lBQ3ZCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixHQUFHO0lBRXBCLENBQUM7SUFFSCxvQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksYUFBYTtJQUx6QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFDLFlBQVk7UUFDckIsV0FBVyxFQUFDLHNCQUFzQjtRQUNwQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztLQUNuQyxDQUFDO3FDQU9tQixXQUFJLEVBQWMsd0JBQVUsRUFBa0IsZUFBTTtHQU41RCxhQUFhLENBMkJ6QjtBQTNCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1dTUHJvdmlkZXJ9IGZyb20gXCIuLi8uLi9zaGFyZWQvd3Mvd3MucHJvdmlkZXJcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6XCJwaXp6YS1tYWluXCIsXG4gICAgdGVtcGxhdGVVcmw6YHBhZ2VzL21haW4vbWFpbi5odG1sYCxcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9tYWluL21haW4uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG5cbiAgXG4gICAgcGl6emFzOkFycmF5PGFueT4gPSBbXTtcbiAgICBpc19wcm9jZXNzaW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHBhZ2U6UGFnZSwgcHJpdmF0ZSBfd3M6V1NQcm92aWRlciwgcHJpdmF0ZSBfcm91dGVyOlJvdXRlciApe1xuICAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7Ly9mdWxsIHNjcmVlbiBwYWdlXG4gICAgfVxuICAgIFxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaXNfcHJvY2Vzc2luZyA9IHRydWU7XG4gICAgLy9yZWN1cGVyZSBsYSBsaXN0ZSBkZXMgcGl6emFzXG4gICAgdGhpcy5fd3MuZ2V0UGl6emFzTGlzdCgpLnRoZW4oZHQ9PntcbiAgICAgIHRoaXMuaXNfcHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5waXp6YXMgPSBkdDtcblxuICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgY29uc29sZS5sb2coZXJyKTsvL1RPRE9cbiAgICAgIHRoaXMuaXNfcHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIH0pXG4gIH1cblxuICBzaG93UGl6emFEZXRhaWxzKGV2dCl7XG4gICAgXG4gIH1cbiAgXG59Il19