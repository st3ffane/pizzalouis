"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ws_provider_1 = require("../../shared/ws/ws.provider");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var CreateAccountComponent = (function () {
    function CreateAccountComponent(page, _ws, _router) {
        this._ws = _ws;
        this._router = _router;
        this.is_processing = false;
        page.actionBarHidden = true; //full screen page
    }
    CreateAccountComponent.prototype.submit = function () {
        var _this = this;
        this.is_processing = true;
        this._ws.createUser(this.login, this.passwrd).then(function (dt) {
            //auth OK, recupere les infos 
            _this._ws.setAuthInfos(dt);
            console.log("navigate to main");
            //va ailleurs.... vers le main 
            _this._router.navigate(['/main', {
                    transition: {
                        name: "flip",
                        duration: 2000,
                        curve: "linear"
                    }
                }]);
            _this.is_processing = false;
        }).catch(function (err) {
            _this.error = "Erreur d'authentification";
            alert(_this.error);
            _this.login = "";
            _this.passwrd = "";
            _this.is_processing = false;
        });
    };
    return CreateAccountComponent;
}());
CreateAccountComponent = __decorate([
    core_1.Component({
        selector: "pizza-main",
        template: "\n    <ScrollView>\n    <StackLayout class=\"shrink\">\n    <StackLayout>\n      <Label class=\"title\" text=\"CREER UN COMPTE\"></Label>\n      <Label textWrap=\"true\" class=\"slogan\" text=\"Rien de plus simple! Il vous suffit de remplir le formulaire ci-dessous, et c'est tout.\"></Label>\n    </StackLayout>\n    <StackLayout class=\"line\"></StackLayout>\n    <StackLayout>\n    \n    <TextField hint=\"Entrez votre pr\u00E9nom, il vous servira de login\" [(ngModel)]=\"login\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Votre adresse mail vous servira de mot de passe\"  [(ngModel)]=\"passwrd\"></TextField>\n     </StackLayout>\n    <ActivityIndicator [busy]=\"is_processing\" [visibility]=\"is_processing ? 'visible' : 'collapse'\" row=\"1\" horizontalAlignment=\"center\" verticalAlignment=\"center\"></ActivityIndicator>\n    \n    <Button text=\"Cr\u00E9ez votre compte\" [visibility]=\"is_processing ? 'collapse' : 'visible'\"  (tap)=\"submit()\"></Button>\n      \n   \n  </StackLayout>\n  </ScrollView>",
        styleUrls: ["pages/createaccount/create.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider, router_1.Router])
], CreateAccountComponent);
exports.CreateAccountComponent = CreateAccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlYWNjb3VudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVhY2NvdW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQsMENBQXVDO0FBRXZDLGdDQUE2QjtBQTJCN0IsSUFBYSxzQkFBc0I7SUFTL0IsZ0NBQVksSUFBUyxFQUFVLEdBQWMsRUFBVSxPQUFjO1FBQXRDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBSHZFLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBSTVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUEsa0JBQWtCO0lBQ2hELENBQUM7SUFDRCx1Q0FBTSxHQUFOO1FBQUEsaUJBMEJDO1FBdkJDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDaEQsOEJBQThCO1lBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUMvQiwrQkFBK0I7WUFDL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQzVCLFVBQVUsRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsSUFBSTt3QkFDZCxLQUFLLEVBQUUsUUFBUTtxQkFDbEI7aUJBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1IsS0FBSSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztZQUN6QyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLHNCQUFzQjtJQXpCbEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBQyxZQUFZO1FBQ3JCLFFBQVEsRUFBQyxpakNBb0JHO1FBQ2QsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDOUMsQ0FBQztxQ0FVbUIsV0FBSSxFQUFjLHdCQUFVLEVBQWtCLGVBQU07R0FUNUQsc0JBQXNCLENBdUNsQztBQXZDWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7V1NQcm92aWRlcn0gZnJvbSBcIi4uLy4uL3NoYXJlZC93cy93cy5wcm92aWRlclwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjpcInBpenphLW1haW5cIixcbiAgICB0ZW1wbGF0ZTpgXG4gICAgPFNjcm9sbFZpZXc+XG4gICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwic2hyaW5rXCI+XG4gICAgPFN0YWNrTGF5b3V0PlxuICAgICAgPExhYmVsIGNsYXNzPVwidGl0bGVcIiB0ZXh0PVwiQ1JFRVIgVU4gQ09NUFRFXCI+PC9MYWJlbD5cbiAgICAgIDxMYWJlbCB0ZXh0V3JhcD1cInRydWVcIiBjbGFzcz1cInNsb2dhblwiIHRleHQ9XCJSaWVuIGRlIHBsdXMgc2ltcGxlISBJbCB2b3VzIHN1ZmZpdCBkZSByZW1wbGlyIGxlIGZvcm11bGFpcmUgY2ktZGVzc291cywgZXQgYydlc3QgdG91dC5cIj48L0xhYmVsPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwibGluZVwiPjwvU3RhY2tMYXlvdXQ+XG4gICAgPFN0YWNrTGF5b3V0PlxuICAgIFxuICAgIDxUZXh0RmllbGQgaGludD1cIkVudHJleiB2b3RyZSBwcsOpbm9tLCBpbCB2b3VzIHNlcnZpcmEgZGUgbG9naW5cIiBbKG5nTW9kZWwpXT1cImxvZ2luXCJcbiAgICAgIGF1dG9jb3JyZWN0PVwiZmFsc2VcIiBhdXRvY2FwaXRhbGl6YXRpb25UeXBlPVwibm9uZVwiPjwvVGV4dEZpZWxkPlxuICAgIDxUZXh0RmllbGQgaGludD1cIlZvdHJlIGFkcmVzc2UgbWFpbCB2b3VzIHNlcnZpcmEgZGUgbW90IGRlIHBhc3NlXCIgIFsobmdNb2RlbCldPVwicGFzc3dyZFwiPjwvVGV4dEZpZWxkPlxuICAgICA8L1N0YWNrTGF5b3V0PlxuICAgIDxBY3Rpdml0eUluZGljYXRvciBbYnVzeV09XCJpc19wcm9jZXNzaW5nXCIgW3Zpc2liaWxpdHldPVwiaXNfcHJvY2Vzc2luZyA/ICd2aXNpYmxlJyA6ICdjb2xsYXBzZSdcIiByb3c9XCIxXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCI+PC9BY3Rpdml0eUluZGljYXRvcj5cbiAgICBcbiAgICA8QnV0dG9uIHRleHQ9XCJDcsOpZXogdm90cmUgY29tcHRlXCIgW3Zpc2liaWxpdHldPVwiaXNfcHJvY2Vzc2luZyA/ICdjb2xsYXBzZScgOiAndmlzaWJsZSdcIiAgKHRhcCk9XCJzdWJtaXQoKVwiPjwvQnV0dG9uPlxuICAgICAgXG4gICBcbiAgPC9TdGFja0xheW91dD5cbiAgPC9TY3JvbGxWaWV3PmAsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvY3JlYXRlYWNjb3VudC9jcmVhdGUuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZUFjY291bnRDb21wb25lbnR7XG5cbiAgICBsb2dpbjpzdHJpbmc7XG4gIHBhc3N3cmQ6c3RyaW5nO1xuXG4gIGVycm9yOnN0cmluZztcbiAgaXNfcHJvY2Vzc2luZzpib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHBhZ2U6UGFnZSwgcHJpdmF0ZSBfd3M6V1NQcm92aWRlciwgcHJpdmF0ZSBfcm91dGVyOlJvdXRlciApe1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsvL2Z1bGwgc2NyZWVuIHBhZ2VcbiAgfVxuICBzdWJtaXQoKXtcblxuXG4gICAgdGhpcy5pc19wcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl93cy5jcmVhdGVVc2VyKHRoaXMubG9naW4sdGhpcy5wYXNzd3JkKS50aGVuKGR0PT57XG4gICAgICAgIC8vYXV0aCBPSywgcmVjdXBlcmUgbGVzIGluZm9zIFxuICAgICAgICAgICAgdGhpcy5fd3Muc2V0QXV0aEluZm9zKGR0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYXZpZ2F0ZSB0byBtYWluXCIpXG4gICAgICAgICAgICAvL3ZhIGFpbGxldXJzLi4uLiB2ZXJzIGxlIG1haW4gXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvbWFpbicsIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmxpcFwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICB0aGlzLmlzX3Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBcIkVycmV1ciBkJ2F1dGhlbnRpZmljYXRpb25cIjtcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbj1cIlwiO1xuICAgICAgICAgICAgdGhpcy5wYXNzd3JkPVwiXCI7XG4gICAgICAgICAgICB0aGlzLmlzX3Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gIH1cbn0iXX0=