"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var AppComponent = (function () {
    function AppComponent(page) {
        page.actionBarHidden = true; //full screen page
    }
    AppComponent.prototype.submit = function () {
        alert("server ip: " + this.server_ip);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n  <StackLayout>\n  <TextField hint=\"server local ip\" [(ngModel)]=\"server_ip\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Login\" [(ngModel)]=\"login\"\n      autocorrect=\"false\" autocapitalizationType=\"none\"></TextField>\n    <TextField hint=\"Password\" secure=\"true\" [(ngModel)]=\"passwrd\"></TextField>\n\n    <Button text=\"Connectez vous\"  class=\"submit-button\" (tap)=\"submit()\"></Button>\n    <Button text=\"ou Cr\u00E9ez votre compte gratuitement\" (tap)=\"toggleDisplay()\"></Button>\n  </StackLayout>\n  ",
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsZ0NBQTZCO0FBa0I3QixJQUFhLFlBQVk7SUFNdkIsc0JBQVksSUFBUztRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFBLGtCQUFrQjtJQUNoRCxDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNFLEtBQUssQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksWUFBWTtJQWhCeEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSx5a0JBV1Q7UUFDRCxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBdUIsQ0FBQztLQUNyRSxDQUFDO3FDQU9pQixXQUFJO0dBTlYsWUFBWSxDQWF4QjtBQWJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICB0ZW1wbGF0ZTogYFxuICA8U3RhY2tMYXlvdXQ+XG4gIDxUZXh0RmllbGQgaGludD1cInNlcnZlciBsb2NhbCBpcFwiIFsobmdNb2RlbCldPVwic2VydmVyX2lwXCJcbiAgICAgIGF1dG9jb3JyZWN0PVwiZmFsc2VcIiBhdXRvY2FwaXRhbGl6YXRpb25UeXBlPVwibm9uZVwiPjwvVGV4dEZpZWxkPlxuICAgIDxUZXh0RmllbGQgaGludD1cIkxvZ2luXCIgWyhuZ01vZGVsKV09XCJsb2dpblwiXG4gICAgICBhdXRvY29ycmVjdD1cImZhbHNlXCIgYXV0b2NhcGl0YWxpemF0aW9uVHlwZT1cIm5vbmVcIj48L1RleHRGaWVsZD5cbiAgICA8VGV4dEZpZWxkIGhpbnQ9XCJQYXNzd29yZFwiIHNlY3VyZT1cInRydWVcIiBbKG5nTW9kZWwpXT1cInBhc3N3cmRcIj48L1RleHRGaWVsZD5cblxuICAgIDxCdXR0b24gdGV4dD1cIkNvbm5lY3RleiB2b3VzXCIgIGNsYXNzPVwic3VibWl0LWJ1dHRvblwiICh0YXApPVwic3VibWl0KClcIj48L0J1dHRvbj5cbiAgICA8QnV0dG9uIHRleHQ9XCJvdSBDcsOpZXogdm90cmUgY29tcHRlIGdyYXR1aXRlbWVudFwiICh0YXApPVwidG9nZ2xlRGlzcGxheSgpXCI+PC9CdXR0b24+XG4gIDwvU3RhY2tMYXlvdXQ+XG4gIGAsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcInBhZ2VzL2xvZ2luL2xvZ2luLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICBzZXJ2ZXJfaXA6c3RyaW5nO1xuICBsb2dpbjpzdHJpbmc7XG4gIHBhc3N3cmQ6c3RyaW5nO1xuXG4gIFxuICBjb25zdHJ1Y3RvcihwYWdlOlBhZ2Upe1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTsvL2Z1bGwgc2NyZWVuIHBhZ2VcbiAgfVxuXG4gIHN1Ym1pdCgpe1xuICAgIGFsZXJ0KFwic2VydmVyIGlwOiBcIit0aGlzLnNlcnZlcl9pcCk7XG4gIH1cbn0iXX0=