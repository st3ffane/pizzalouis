"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ws_provider_1 = require("../../shared/ws/ws.provider");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var Toast = require("nativescript-toast");
var DetailsComponent = (function () {
    function DetailsComponent(page, _ws, activatedRoute) {
        var _this = this;
        this._ws = _ws;
        this.activatedRoute = activatedRoute;
        this.is_processing = false;
        this.is_sending = false;
        this.notes = ["Bof", "Passable", "Bonne", "Très bonne", "Excellente!"];
        //pour le commentaire
        this.message = "";
        this.note = 5;
        page.actionBarHidden = true; //full screen page
        this.activatedRoute.params.subscribe(function (params) {
            _this.is_processing = true;
            var id = params['id'];
            _this._ws.loadPizza(id).then(function (dt) {
                _this.pizza = dt;
                _this.is_processing = false;
            }).catch(function (err) {
                _this.error = "Error retreiving news datas";
                _this.is_processing = false;
            });
        });
    }
    DetailsComponent.prototype.ngOnInit = function () {
        //recupere la liste des pizzas
    };
    DetailsComponent.prototype.selectedIndexChanged = function (evt) {
        var picker = evt.object;
        this.note = picker.selectedIndex + 1;
    };
    DetailsComponent.prototype.sendMessage = function () {
        var _this = this;
        if (this.message != '') {
            //send message...
            this.is_sending = true;
            this._ws.postPizzaComment(this.pizza.id, this.message, this.note).then(function (dt) {
                Toast.makeText("Merci pour votre commentaire...").show();
                _this.is_sending = false;
            }).catch(function (err) {
                console.log(err);
                _this.is_sending = false;
            });
        }
    };
    return DetailsComponent;
}());
DetailsComponent = __decorate([
    core_1.Component({
        selector: "pizza-details",
        templateUrl: "pages/details/details.html",
        styleUrls: ["pages/main/main.css", "pages/details/details.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider, router_1.ActivatedRoute])
], DetailsComponent);
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUNoRCwyREFBdUQ7QUFDdkQsMENBQXVEO0FBRXZELGdDQUE2QjtBQUU3QiwwQ0FBNEM7QUFRNUMsSUFBYSxnQkFBZ0I7SUFRekIsMEJBQVksSUFBUyxFQUFVLEdBQWMsRUFBVSxjQUE4QjtRQUFyRixpQkFhQztRQWI4QixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBSnJGLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBQzlCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUF1QjdCLFVBQUssR0FBaUIsQ0FBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxDQUFDLENBQUE7UUFDM0UscUJBQXFCO1FBQ3JCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFDcEIsU0FBSSxHQUFVLENBQUMsQ0FBQztRQXRCYixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFBLGtCQUFrQjtRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFjO1lBQ2hELEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO2dCQUMxQixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDUixLQUFJLENBQUMsS0FBSyxHQUFHLDZCQUE2QixDQUFDO2dCQUMzQyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVILG1DQUFRLEdBQVI7UUFFRSw4QkFBOEI7SUFFaEMsQ0FBQztJQU1ELCtDQUFvQixHQUFwQixVQUFxQixHQUFHO1FBQ3RCLElBQUksTUFBTSxHQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsYUFBYSxHQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsc0NBQVcsR0FBWDtRQUFBLGlCQWFDO1FBWkcsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ25CLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFBLEVBQUU7Z0JBRXhFLEtBQUssQ0FBQyxRQUFRLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEQsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFDTCxDQUFDO0lBR0gsdUJBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBckRZLGdCQUFnQjtJQUw1QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFDLGVBQWU7UUFDeEIsV0FBVyxFQUFDLDRCQUE0QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsRUFBQywyQkFBMkIsQ0FBQztLQUMvRCxDQUFDO3FDQVNtQixXQUFJLEVBQWMsd0JBQVUsRUFBMEIsdUJBQWM7R0FSNUUsZ0JBQWdCLENBcUQ1QjtBQXJEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtXU1Byb3ZpZGVyfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ1aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjpcInBpenphLWRldGFpbHNcIixcbiAgICB0ZW1wbGF0ZVVybDpgcGFnZXMvZGV0YWlscy9kZXRhaWxzLmh0bWxgLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL21haW4vbWFpbi5jc3NcIixcInBhZ2VzL2RldGFpbHMvZGV0YWlscy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuICBcbiAgICBwaXp6YTphbnk7XG4gICAgaXNfcHJvY2Vzc2luZzpib29sZWFuID0gZmFsc2U7XG4gICAgaXNfc2VuZGluZzpib29sZWFuID0gZmFsc2U7XG4gICAgZXJyb3I6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocGFnZTpQYWdlLCBwcml2YXRlIF93czpXU1Byb3ZpZGVyLCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgKXtcbiAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlOy8vZnVsbCBzY3JlZW4gcGFnZVxuICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICB0aGlzLmlzX3Byb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGlkID0gcGFyYW1zWydpZCddO1xuICAgICAgICAgICAgdGhpcy5fd3MubG9hZFBpenphKGlkKS50aGVuKGR0PT57XG4gICAgICAgICAgICAgICAgdGhpcy5waXp6YSA9IGR0O1xuICAgICAgICAgICAgICAgIHRoaXMuaXNfcHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IFwiRXJyb3IgcmV0cmVpdmluZyBuZXdzIGRhdGFzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pc19wcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gIG5nT25Jbml0KCl7XG4gICAgXG4gICAgLy9yZWN1cGVyZSBsYSBsaXN0ZSBkZXMgcGl6emFzXG4gICAgXG4gIH1cbiAgbm90ZXM6QXJyYXk8U3RyaW5nPiA9IFtcIkJvZlwiLFwiUGFzc2FibGVcIixcIkJvbm5lXCIsXCJUcsOocyBib25uZVwiLFwiRXhjZWxsZW50ZSFcIl1cbiAgLy9wb3VyIGxlIGNvbW1lbnRhaXJlXG4gIG1lc3NhZ2U6c3RyaW5nID0gXCJcIjtcbiAgbm90ZTpudW1iZXIgPSA1O1xuXG4gIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGV2dCl7XG4gICAgbGV0IHBpY2tlciA9IDxMaXN0UGlja2VyPmV2dC5vYmplY3Q7XG4gICAgdGhpcy5ub3RlID0gcGlja2VyLnNlbGVjdGVkSW5kZXggKzE7XG4gIH1cbiAgc2VuZE1lc3NhZ2UoKXtcbiAgICAgIGlmKHRoaXMubWVzc2FnZSAhPSAnJyl7XG4gICAgICAgICAgLy9zZW5kIG1lc3NhZ2UuLi5cbiAgICAgICAgICB0aGlzLmlzX3NlbmRpbmc9dHJ1ZTtcbiAgICAgICAgICB0aGlzLl93cy5wb3N0UGl6emFDb21tZW50KHRoaXMucGl6emEuaWQsIHRoaXMubWVzc2FnZSwgdGhpcy5ub3RlKS50aGVuKCBkdD0+e1xuXG4gICAgICAgICAgICBUb2FzdC5tYWtlVGV4dChcIk1lcmNpIHBvdXIgdm90cmUgY29tbWVudGFpcmUuLi5cIikuc2hvdygpO1xuICAgICAgICAgICAgIHRoaXMuaXNfc2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICB0aGlzLmlzX3NlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9KVxuICAgICAgfVxuICB9XG5cbiAgXG59Il19