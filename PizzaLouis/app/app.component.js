"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var ws_provider_1 = require("./shared/ws/ws.provider");
var AppComponent = (function () {
    function AppComponent(page, _ws) {
        this._ws = _ws;
        this.server_ip = "192.168.1.16";
        this.is_processing = false;
        page.actionBarHidden = true; //full screen page
    }
    AppComponent.prototype.submit = function () {
        var _this = this;
        console.log("tente le login");
        this._ws.setServerIP(this.server_ip); //@DEBUG ONLY
        this._ws.login(this.login, this.passwrd).then(function (dt) {
            //auth OK, recupere les infos 
            _this._ws.setAuthInfos(dt);
            _this.is_processing = false;
            //va ailleurs.... vers le main 
            //this._route.navigate(['/main']);
        }).catch(function (err) {
            _this.error = "Erreur d'authentification";
            _this.is_processing = false;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n  <StackLayout>\n  <TextField hint=\"server local ip\" [(ngModel)]=\"server_ip\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Login\" [(ngModel)]=\"login\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Password\" secure=\"true\" [(ngModel)]=\"passwrd\"></TextField>\n\n    <Button text=\"Connectez vous\"  class=\"submit-button\" (tap)=\"submit()\"></Button>\n    <Button text=\"ou Cr\u00E9ez votre compte gratuitement\" (tap)=\"toggleDisplay()\"></Button>\n  </StackLayout>\n  ",
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, ws_provider_1.WSProvider])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsZ0NBQTZCO0FBRTdCLHVEQUFxRDtBQWlCckQsSUFBYSxZQUFZO0lBUXZCLHNCQUFZLElBQVMsRUFBVSxHQUFjO1FBQWQsUUFBRyxHQUFILEdBQUcsQ0FBVztRQVA3QyxjQUFTLEdBQVUsY0FBYyxDQUFDO1FBS2xDLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBRzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUEsa0JBQWtCO0lBQ2hELENBQUM7SUFFRCw2QkFBTSxHQUFOO1FBQUEsaUJBY0M7UUFiQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsYUFBYTtRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQzNDLDhCQUE4QjtZQUMxQixLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQiwrQkFBK0I7WUFDL0Isa0NBQWtDO1FBRXRDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDUixLQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDO1lBQ3pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxZQUFZO0lBaEJ4QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLHlrQkFXVDtRQUNELFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3JFLENBQUM7cUNBU2lCLFdBQUksRUFBYyx3QkFBVTtHQVJsQyxZQUFZLENBMkJ4QjtBQTNCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7IFdTUHJvdmlkZXIgfSBmcm9tIFwiLi9zaGFyZWQvd3Mvd3MucHJvdmlkZXJcIjtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGU6IGBcbiAgPFN0YWNrTGF5b3V0PlxuICA8VGV4dEZpZWxkIGhpbnQ9XCJzZXJ2ZXIgbG9jYWwgaXBcIiBbKG5nTW9kZWwpXT1cInNlcnZlcl9pcFwiXG4gICAgICBhdXRvY29ycmVjdD1cImZhbHNlXCIgYXV0b2NhcGl0YWxpemF0aW9uVHlwZT1cIm5vbmVcIj48L1RleHRGaWVsZD5cbiAgICA8VGV4dEZpZWxkIGhpbnQ9XCJMb2dpblwiIFsobmdNb2RlbCldPVwibG9naW5cIlxuICAgICAgYXV0b2NvcnJlY3Q9XCJmYWxzZVwiIGF1dG9jYXBpdGFsaXphdGlvblR5cGU9XCJub25lXCI+PC9UZXh0RmllbGQ+XG4gICAgPFRleHRGaWVsZCBoaW50PVwiUGFzc3dvcmRcIiBzZWN1cmU9XCJ0cnVlXCIgWyhuZ01vZGVsKV09XCJwYXNzd3JkXCI+PC9UZXh0RmllbGQ+XG5cbiAgICA8QnV0dG9uIHRleHQ9XCJDb25uZWN0ZXogdm91c1wiICBjbGFzcz1cInN1Ym1pdC1idXR0b25cIiAodGFwKT1cInN1Ym1pdCgpXCI+PC9CdXR0b24+XG4gICAgPEJ1dHRvbiB0ZXh0PVwib3UgQ3LDqWV6IHZvdHJlIGNvbXB0ZSBncmF0dWl0ZW1lbnRcIiAodGFwKT1cInRvZ2dsZURpc3BsYXkoKVwiPjwvQnV0dG9uPlxuICA8L1N0YWNrTGF5b3V0PlxuICBgLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgc2VydmVyX2lwOnN0cmluZyA9IFwiMTkyLjE2OC4xLjE2XCI7XG4gIGxvZ2luOnN0cmluZztcbiAgcGFzc3dyZDpzdHJpbmc7XG5cbiAgZXJyb3I6c3RyaW5nO1xuICBpc19wcm9jZXNzaW5nOmJvb2xlYW4gPSBmYWxzZTtcbiAgXG4gIGNvbnN0cnVjdG9yKHBhZ2U6UGFnZSwgcHJpdmF0ZSBfd3M6V1NQcm92aWRlciApe1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsvL2Z1bGwgc2NyZWVuIHBhZ2VcbiAgfVxuXG4gIHN1Ym1pdCgpe1xuICAgIGNvbnNvbGUubG9nKFwidGVudGUgbGUgbG9naW5cIik7XG4gICAgdGhpcy5fd3Muc2V0U2VydmVySVAodGhpcy5zZXJ2ZXJfaXApOy8vQERFQlVHIE9OTFlcbiAgICB0aGlzLl93cy5sb2dpbih0aGlzLmxvZ2luLHRoaXMucGFzc3dyZCkudGhlbihkdD0+e1xuICAgICAgICAvL2F1dGggT0ssIHJlY3VwZXJlIGxlcyBpbmZvcyBcbiAgICAgICAgICAgIHRoaXMuX3dzLnNldEF1dGhJbmZvcyhkdCk7XG4gICAgICAgICAgICB0aGlzLmlzX3Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vdmEgYWlsbGV1cnMuLi4uIHZlcnMgbGUgbWFpbiBcbiAgICAgICAgICAgIC8vdGhpcy5fcm91dGUubmF2aWdhdGUoWycvbWFpbiddKTtcblxuICAgICAgICB9KS5jYXRjaChlcnI9PntcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBcIkVycmV1ciBkJ2F1dGhlbnRpZmljYXRpb25cIjtcbiAgICAgICAgICAgIHRoaXMuaXNfcHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgfVxufSJdfQ==