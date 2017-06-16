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
        page.actionBarHidden = true; //full screen page
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        //recupere la liste des pizzas
        this._ws.getPizzasList().then(function (dt) {
            console.log(dt); //pour etre sur....
            _this.pizzas = dt;
        }).catch(function (err) {
            console.log(err); //TODO
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUNoRCwyREFBdUQ7QUFDdkQsMENBQXVDO0FBRXZDLGdDQUE2QjtBQU83QixJQUFhLGFBQWE7SUFLdEIsdUJBQVksSUFBUyxFQUFVLEdBQWMsRUFBVSxPQUFjO1FBQXRDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRnJFLFdBQU0sR0FBYyxFQUFFLENBQUM7UUFHdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQSxrQkFBa0I7SUFDL0MsQ0FBQztJQUVILGdDQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLG1CQUFtQjtZQUNuQyxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsd0NBQWdCLEdBQWhCLFVBQWlCLEdBQUc7SUFFcEIsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSxhQUFhO0lBTHpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUMsWUFBWTtRQUNyQixXQUFXLEVBQUMsc0JBQXNCO1FBQ3BDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0tBQ25DLENBQUM7cUNBTW1CLFdBQUksRUFBYyx3QkFBVSxFQUFrQixlQUFNO0dBTDVELGFBQWEsQ0F3QnpCO0FBeEJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7V1NQcm92aWRlcn0gZnJvbSBcIi4uLy4uL3NoYXJlZC93cy93cy5wcm92aWRlclwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjpcInBpenphLW1haW5cIixcbiAgICB0ZW1wbGF0ZVVybDpgcGFnZXMvbWFpbi9tYWluLmh0bWxgLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL21haW4vbWFpbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuICBcbiAgICBwaXp6YXM6QXJyYXk8YW55PiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTpQYWdlLCBwcml2YXRlIF93czpXU1Byb3ZpZGVyLCBwcml2YXRlIF9yb3V0ZXI6Um91dGVyICl7XG4gICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsvL2Z1bGwgc2NyZWVuIHBhZ2VcbiAgICB9XG4gICAgXG4gIG5nT25Jbml0KCl7XG4gICAgLy9yZWN1cGVyZSBsYSBsaXN0ZSBkZXMgcGl6emFzXG4gICAgdGhpcy5fd3MuZ2V0UGl6emFzTGlzdCgpLnRoZW4oZHQ9PntcbiAgICAgIGNvbnNvbGUubG9nKGR0KTsvL3BvdXIgZXRyZSBzdXIuLi4uXG4gICAgICB0aGlzLnBpenphcyA9IGR0O1xuXG4gICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICBjb25zb2xlLmxvZyhlcnIpOy8vVE9ET1xuICAgIH0pXG4gIH1cblxuICBzaG93UGl6emFEZXRhaWxzKGV2dCl7XG4gICAgXG4gIH1cbiAgXG59Il19