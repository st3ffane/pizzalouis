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
        template: "\n  <StackLayout>\n    <StackLayout>\n      <Label class=\"title\" text=\"Pizzas Louis\"></Label>\n      <Label textWrap=\"true\" class=\"slogan\" text=\"la passion de la v\u00E9ritable pizza artisanale.\"></Label>\n    </StackLayout>\n    <StackLayout class=\"shrink\">\n    <TextField style.placeholderColor=\"white\" hint=\"server local ip\" [(ngModel)]=\"server_ip\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Login\" style.placeholderColor=\"white\" [(ngModel)]=\"login\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField style.placeholderColor=\"white\" hint=\"Password\" secure=\"true\" [(ngModel)]=\"passwrd\"></TextField>\n     </StackLayout>\n    <ActivityIndicator [busy]=\"is_processing\" [visibility]=\"is_processing ? 'visible' : 'collapse'\" row=\"1\" horizontalAlignment=\"center\" verticalAlignment=\"center\"></ActivityIndicator>\n    <StackLayout [visibility]=\"is_processing ? 'collapse' : 'visible'\">\n      <Button text=\"Connectez vous\"  class=\"submit-button\" (tap)=\"submit()\"></Button>\n      <Button text=\"ou Cr\u00E9ez votre compte gratuitement\" [nsRouterLink]=\"['/register']\" pageTransition=\"flip\" ></Button>\n    </StackLayout>\n   \n  </StackLayout>\n  ",
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLGdDQUE2QjtBQUc3QiwwQ0FBdUM7QUFDdkMsMkRBQXlEO0FBRXpELDhDQUEwQztBQTJCMUMsSUFBYSxjQUFjO0lBUXpCLHdCQUFZLElBQVMsRUFBVSxHQUFjLEVBQVUsT0FBYztRQUF0QyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBTztRQVByRSxjQUFTLEdBQVUsY0FBYyxDQUFDO1FBS2xDLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBRzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUEsa0JBQWtCO1FBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBSyxDQUFBLENBQUEsT0FBTztJQUNyQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxhQUFhO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDM0MsOEJBQThCO1lBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtZQUMvQiwrQkFBK0I7WUFDL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQzVCLFVBQVUsRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsSUFBSTt3QkFDZCxLQUFLLEVBQUUsUUFBUTtxQkFDbEI7aUJBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1IsS0FBSSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztZQUN6QyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7WUFDaEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLGNBQWM7SUF6QjFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUUsMHdDQW9CVDtRQUNELFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3JFLENBQUM7cUNBU2lCLFdBQUksRUFBYyx3QkFBVSxFQUFrQixlQUFNO0dBUjFELGNBQWMsQ0F1QzFCO0FBdkNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5cbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBXU1Byb3ZpZGVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC93cy93cy5wcm92aWRlclwiO1xuXG5pbXBvcnQge0dSRUVOfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbG9yc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwicGl6emEtbG9naW5cIixcbiAgdGVtcGxhdGU6IGBcbiAgPFN0YWNrTGF5b3V0PlxuICAgIDxTdGFja0xheW91dD5cbiAgICAgIDxMYWJlbCBjbGFzcz1cInRpdGxlXCIgdGV4dD1cIlBpenphcyBMb3Vpc1wiPjwvTGFiZWw+XG4gICAgICA8TGFiZWwgdGV4dFdyYXA9XCJ0cnVlXCIgY2xhc3M9XCJzbG9nYW5cIiB0ZXh0PVwibGEgcGFzc2lvbiBkZSBsYSB2w6lyaXRhYmxlIHBpenphIGFydGlzYW5hbGUuXCI+PC9MYWJlbD5cbiAgICA8L1N0YWNrTGF5b3V0PlxuICAgIDxTdGFja0xheW91dCBjbGFzcz1cInNocmlua1wiPlxuICAgIDxUZXh0RmllbGQgc3R5bGUucGxhY2Vob2xkZXJDb2xvcj1cIndoaXRlXCIgaGludD1cInNlcnZlciBsb2NhbCBpcFwiIFsobmdNb2RlbCldPVwic2VydmVyX2lwXCJcbiAgICAgIGF1dG9jb3JyZWN0PVwiZmFsc2VcIiBhdXRvY2FwaXRhbGl6YXRpb25UeXBlPVwibm9uZVwiPjwvVGV4dEZpZWxkPlxuICAgIDxUZXh0RmllbGQgaGludD1cIkxvZ2luXCIgc3R5bGUucGxhY2Vob2xkZXJDb2xvcj1cIndoaXRlXCIgWyhuZ01vZGVsKV09XCJsb2dpblwiXG4gICAgICBhdXRvY29ycmVjdD1cImZhbHNlXCIgYXV0b2NhcGl0YWxpemF0aW9uVHlwZT1cIm5vbmVcIj48L1RleHRGaWVsZD5cbiAgICA8VGV4dEZpZWxkIHN0eWxlLnBsYWNlaG9sZGVyQ29sb3I9XCJ3aGl0ZVwiIGhpbnQ9XCJQYXNzd29yZFwiIHNlY3VyZT1cInRydWVcIiBbKG5nTW9kZWwpXT1cInBhc3N3cmRcIj48L1RleHRGaWVsZD5cbiAgICAgPC9TdGFja0xheW91dD5cbiAgICA8QWN0aXZpdHlJbmRpY2F0b3IgW2J1c3ldPVwiaXNfcHJvY2Vzc2luZ1wiIFt2aXNpYmlsaXR5XT1cImlzX3Byb2Nlc3NpbmcgPyAndmlzaWJsZScgOiAnY29sbGFwc2UnXCIgcm93PVwiMVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImNlbnRlclwiPjwvQWN0aXZpdHlJbmRpY2F0b3I+XG4gICAgPFN0YWNrTGF5b3V0IFt2aXNpYmlsaXR5XT1cImlzX3Byb2Nlc3NpbmcgPyAnY29sbGFwc2UnIDogJ3Zpc2libGUnXCI+XG4gICAgICA8QnV0dG9uIHRleHQ9XCJDb25uZWN0ZXogdm91c1wiICBjbGFzcz1cInN1Ym1pdC1idXR0b25cIiAodGFwKT1cInN1Ym1pdCgpXCI+PC9CdXR0b24+XG4gICAgICA8QnV0dG9uIHRleHQ9XCJvdSBDcsOpZXogdm90cmUgY29tcHRlIGdyYXR1aXRlbWVudFwiIFtuc1JvdXRlckxpbmtdPVwiWycvcmVnaXN0ZXInXVwiIHBhZ2VUcmFuc2l0aW9uPVwiZmxpcFwiID48L0J1dHRvbj5cbiAgICA8L1N0YWNrTGF5b3V0PlxuICAgXG4gIDwvU3RhY2tMYXlvdXQ+XG4gIGAsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcInBhZ2VzL2xvZ2luL2xvZ2luLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XG4gIHNlcnZlcl9pcDpzdHJpbmcgPSBcIjE5Mi4xNjguMS4xNlwiO1xuICBsb2dpbjpzdHJpbmc7XG4gIHBhc3N3cmQ6c3RyaW5nO1xuXG4gIGVycm9yOnN0cmluZztcbiAgaXNfcHJvY2Vzc2luZzpib29sZWFuID0gZmFsc2U7XG4gIFxuICBjb25zdHJ1Y3RvcihwYWdlOlBhZ2UsIHByaXZhdGUgX3dzOldTUHJvdmlkZXIsIHByaXZhdGUgX3JvdXRlcjpSb3V0ZXIgKXtcbiAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7Ly9mdWxsIHNjcmVlbiBwYWdlXG4gICAgcGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBHUkVFTi8vZ3JlZW5cbiAgfVxuXG4gIHN1Ym1pdCgpe1xuICAgIHRoaXMuaXNfcHJvY2Vzc2luZyA9IHRydWU7XG4gICAgdGhpcy5fd3Muc2V0U2VydmVySVAodGhpcy5zZXJ2ZXJfaXApOy8vQERFQlVHIE9OTFlcbiAgICB0aGlzLl93cy5sb2dpbih0aGlzLmxvZ2luLHRoaXMucGFzc3dyZCkudGhlbihkdD0+e1xuICAgICAgICAvL2F1dGggT0ssIHJlY3VwZXJlIGxlcyBpbmZvcyBcbiAgICAgICAgICAgIHRoaXMuX3dzLnNldEF1dGhJbmZvcyhkdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF2aWdhdGUgdG8gbWFpblwiKVxuICAgICAgICAgICAgLy92YSBhaWxsZXVycy4uLi4gdmVycyBsZSBtYWluIFxuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL21haW4nLCB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZsaXBcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImxpbmVhclwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgdGhpcy5pc19wcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gXCJFcnJldXIgZCdhdXRoZW50aWZpY2F0aW9uXCI7XG4gICAgICAgICAgICBhbGVydCh0aGlzLmVycm9yKTtcbiAgICAgICAgICAgIHRoaXMubG9naW49XCJcIjtcbiAgICAgICAgICAgIHRoaXMucGFzc3dyZD1cIlwiO1xuICAgICAgICAgICAgdGhpcy5pc19wcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICB9XG59Il19