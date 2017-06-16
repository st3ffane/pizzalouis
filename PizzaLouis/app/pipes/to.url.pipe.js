"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ws_provider_1 = require("../shared/ws/ws.provider");
var ToUrlPipe = (function () {
    function ToUrlPipe(_ws) {
        this._ws = _ws;
    }
    ToUrlPipe.prototype.transform = function (url, path) {
        if (path === void 0) { path = "/images/pizzas/"; }
        var cible = this._ws.SERVER_URL + path + url;
        console.log(cible);
        return cible;
    };
    return ToUrlPipe;
}());
ToUrlPipe = __decorate([
    core_1.Pipe({ name: 'tourl' }),
    __metadata("design:paramtypes", [ws_provider_1.WSProvider])
], ToUrlPipe);
exports.ToUrlPipe = ToUrlPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8udXJsLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0by51cmwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxQztBQUNyQyx3REFBb0Q7QUFJcEQsSUFBYSxTQUFTO0lBQ3BCLG1CQUFvQixHQUFjO1FBQWQsUUFBRyxHQUFILEdBQUcsQ0FBVztJQUFFLENBQUM7SUFFckMsNkJBQVMsR0FBVCxVQUFVLEdBQVUsRUFBRSxJQUErQjtRQUEvQixxQkFBQSxFQUFBLHdCQUErQjtRQUduRCxJQUFJLEtBQUssR0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksU0FBUztJQURyQixXQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7cUNBRUksd0JBQVU7R0FEdkIsU0FBUyxDQVVyQjtBQVZZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXU1Byb3ZpZGVyfSBmcm9tIFwiLi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5cblxuQFBpcGUoe25hbWU6ICd0b3VybCd9KVxuZXhwb3J0IGNsYXNzIFRvVXJsUGlwZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dzOldTUHJvdmlkZXIpe31cblxuICB0cmFuc2Zvcm0odXJsOnN0cmluZywgcGF0aDpzdHJpbmcgPSBcIi9pbWFnZXMvcGl6emFzL1wiKSB7XG4gICAgXG4gICAgXG4gICAgbGV0IGNpYmxlID0gIHRoaXMuX3dzLlNFUlZFUl9VUkwrcGF0aCt1cmw7XG4gICAgY29uc29sZS5sb2coY2libGUpO1xuICAgIHJldHVybiBjaWJsZTtcbiAgfVxufSJdfQ==