"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var ws_provider_1 = require("../../shared/ws/ws.provider");
var colors_1 = require("../../shared/colors");
var LoginComponent = (function () {
    function LoginComponent(page, _ws, _router) {
        this._ws = _ws;
        this._router = _router;
        this.server_ip = "192.168.1.16";
        this.is_processing = false;
        page.actionBarHidden = true; //full screen page
        page.backgroundColor = colors_1.GREEN; //green
    }
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.is_processing = true;
        this._ws.setServerIP(this.server_ip); //@DEBUG ONLY
        this._ws.login(this.login, this.passwrd).then(function (dt) {
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
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "pizza-login",
        template: "\n  <StackLayout>\n    <StackLayout>\n      <Label class=\"title\" text=\"Pizzas Louis\"></Label>\n      <Label textWrap=\"true\" class=\"slogan\" text=\"LA PASSION DE LA VERITABLE PIZZA ARTISANALE.\"></Label>\n    </StackLayout>\n    <StackLayout class=\"line\"></StackLayout>\n    <StackLayout class=\"shrink\">\n    <TextField style.placeholderColor=\"white\" hint=\"server local ip\" [(ngModel)]=\"server_ip\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Login\" style.placeholderColor=\"white\" [(ngModel)]=\"login\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField style.placeholderColor=\"white\" hint=\"Password\" secure=\"true\" [(ngModel)]=\"passwrd\"></TextField>\n     </StackLayout>\n    <ActivityIndicator [busy]=\"is_processing\" [visibility]=\"is_processing ? 'visible' : 'collapse'\" row=\"1\" horizontalAlignment=\"center\" verticalAlignment=\"center\"></ActivityIndicator>\n    <StackLayout [visibility]=\"is_processing ? 'collapse' : 'visible'\">\n      <Button text=\"Connectez vous\"  class=\"submit-button\" (tap)=\"submit()\"></Button>\n      <Button text=\"ou Cr\u00E9ez votre compte gratuitement\" [nsRouterLink]=\"['/register']\" pageTransition=\"flip\" ></Button>\n    </StackLayout>\n   \n  </StackLayout>\n  ",
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLGdDQUE2QjtBQUc3QiwwQ0FBdUM7QUFDdkMsMkRBQXlEO0FBRXpELDhDQUEwQztBQTRCMUMsSUFBYSxjQUFjO0lBUXpCLHdCQUFZLElBQVMsRUFBVSxHQUFjLEVBQVUsT0FBYztRQUF0QyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBTztRQVByRSxjQUFTLEdBQVUsY0FBYyxDQUFDO1FBS2xDLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBRzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUEsa0JBQWtCO1FBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBSyxDQUFBLENBQUEsT0FBTztJQUNyQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxhQUFhO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDM0MsOEJBQThCO1lBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUMvQiwrQkFBK0I7WUFDL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQzVCLFVBQVUsRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsSUFBSTt3QkFDZCxLQUFLLEVBQUUsUUFBUTtxQkFDbEI7aUJBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1IsS0FBSSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztZQUN6QyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLGNBQWM7SUExQjFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUUscXpDQXFCVDtRQUNELFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3JFLENBQUM7cUNBU2lCLFdBQUksRUFBYyx3QkFBVSxFQUFrQixlQUFNO0dBUjFELGNBQWMsQ0F1QzFCO0FBdkNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5cbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBXU1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC93cy93cy5wcm92aWRlclwiO1xuXG5pbXBvcnQge0dSRUVOfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbG9yc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwicGl6emEtbG9naW5cIixcbiAgdGVtcGxhdGU6IGBcbiAgPFN0YWNrTGF5b3V0PlxuICAgIDxTdGFja0xheW91dD5cbiAgICAgIDxMYWJlbCBjbGFzcz1cInRpdGxlXCIgdGV4dD1cIlBpenphcyBMb3Vpc1wiPjwvTGFiZWw+XG4gICAgICA8TGFiZWwgdGV4dFdyYXA9XCJ0cnVlXCIgY2xhc3M9XCJzbG9nYW5cIiB0ZXh0PVwiTEEgUEFTU0lPTiBERSBMQSBWRVJJVEFCTEUgUElaWkEgQVJUSVNBTkFMRS5cIj48L0xhYmVsPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwibGluZVwiPjwvU3RhY2tMYXlvdXQ+XG4gICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwic2hyaW5rXCI+XG4gICAgPFRleHRGaWVsZCBzdHlsZS5wbGFjZWhvbGRlckNvbG9yPVwid2hpdGVcIiBoaW50PVwic2VydmVyIGxvY2FsIGlwXCIgWyhuZ01vZGVsKV09XCJzZXJ2ZXJfaXBcIlxuICAgICAgYXV0b2NvcnJlY3Q9XCJmYWxzZVwiIGF1dG9jYXBpdGFsaXphdGlvblR5cGU9XCJub25lXCI+PC9UZXh0RmllbGQ+XG4gICAgPFRleHRGaWVsZCBoaW50PVwiTG9naW5cIiBzdHlsZS5wbGFjZWhvbGRlckNvbG9yPVwid2hpdGVcIiBbKG5nTW9kZWwpXT1cImxvZ2luXCJcbiAgICAgIGF1dG9jb3JyZWN0PVwiZmFsc2VcIiBhdXRvY2FwaXRhbGl6YXRpb25UeXBlPVwibm9uZVwiPjwvVGV4dEZpZWxkPlxuICAgIDxUZXh0RmllbGQgc3R5bGUucGxhY2Vob2xkZXJDb2xvcj1cIndoaXRlXCIgaGludD1cIlBhc3N3b3JkXCIgc2VjdXJlPVwidHJ1ZVwiIFsobmdNb2RlbCldPVwicGFzc3dyZFwiPjwvVGV4dEZpZWxkPlxuICAgICA8L1N0YWNrTGF5b3V0PlxuICAgIDxBY3Rpdml0eUluZGljYXRvciBbYnVzeV09XCJpc19wcm9jZXNzaW5nXCIgW3Zpc2liaWxpdHldPVwiaXNfcHJvY2Vzc2luZyA/ICd2aXNpYmxlJyA6ICdjb2xsYXBzZSdcIiByb3c9XCIxXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCI+PC9BY3Rpdml0eUluZGljYXRvcj5cbiAgICA8U3RhY2tMYXlvdXQgW3Zpc2liaWxpdHldPVwiaXNfcHJvY2Vzc2luZyA/ICdjb2xsYXBzZScgOiAndmlzaWJsZSdcIj5cbiAgICAgIDxCdXR0b24gdGV4dD1cIkNvbm5lY3RleiB2b3VzXCIgIGNsYXNzPVwic3VibWl0LWJ1dHRvblwiICh0YXApPVwic3VibWl0KClcIj48L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gdGV4dD1cIm91IENyw6lleiB2b3RyZSBjb21wdGUgZ3JhdHVpdGVtZW50XCIgW25zUm91dGVyTGlua109XCJbJy9yZWdpc3RlciddXCIgcGFnZVRyYW5zaXRpb249XCJmbGlwXCIgPjwvQnV0dG9uPlxuICAgIDwvU3RhY2tMYXlvdXQ+XG4gICBcbiAgPC9TdGFja0xheW91dD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IHtcbiAgc2VydmVyX2lwOnN0cmluZyA9IFwiMTkyLjE2OC4xLjE2XCI7XG4gIGxvZ2luOnN0cmluZztcbiAgcGFzc3dyZDpzdHJpbmc7XG5cbiAgZXJyb3I6c3RyaW5nO1xuICBpc19wcm9jZXNzaW5nOmJvb2xlYW4gPSBmYWxzZTtcbiAgXG4gIGNvbnN0cnVjdG9yKHBhZ2U6UGFnZSwgcHJpdmF0ZSBfd3M6V1NQcm92aWRlciwgcHJpdmF0ZSBfcm91dGVyOlJvdXRlciApe1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsvL2Z1bGwgc2NyZWVuIHBhZ2VcbiAgICBwYWdlLmJhY2tncm91bmRDb2xvciA9IEdSRUVOLy9ncmVlblxuICB9XG5cbiAgc3VibWl0KCl7XG4gICAgdGhpcy5pc19wcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl93cy5zZXRTZXJ2ZXJJUCh0aGlzLnNlcnZlcl9pcCk7Ly9AREVCVUcgT05MWVxuICAgIHRoaXMuX3dzLmxvZ2luKHRoaXMubG9naW4sdGhpcy5wYXNzd3JkKS50aGVuKGR0PT57XG4gICAgICAgIC8vYXV0aCBPSywgcmVjdXBlcmUgbGVzIGluZm9zIFxuICAgICAgICAgICAgdGhpcy5fd3Muc2V0QXV0aEluZm9zKGR0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYXZpZ2F0ZSB0byBtYWluXCIpXG4gICAgICAgICAgICAvL3ZhIGFpbGxldXJzLi4uLiB2ZXJzIGxlIG1haW4gXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvbWFpbicsIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmxpcFwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICB0aGlzLmlzX3Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBcIkVycmV1ciBkJ2F1dGhlbnRpZmljYXRpb25cIjtcbiAgICAgICAgICAgIGFsZXJ0KHRoaXMuZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbj1cIlwiO1xuICAgICAgICAgICAgdGhpcy5wYXNzd3JkPVwiXCI7XG4gICAgICAgICAgICB0aGlzLmlzX3Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gIH1cbn0iXX0=