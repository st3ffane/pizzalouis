"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
/**
 * Provider d'acces au webservice du site pizzas
 */
var WSProvider = (function () {
    function WSProvider(_http, _route) {
        //this.getLocation();
        this._http = _http;
        this._route = _route;
        this.auth_token = null; //par defaut, non identifier
        this.pizzas = []; //pour eviter des les recharger a chaque fois 
        this.location = {
            latitude: 43.669070,
            longitude: -1.105356
        };
        this.toolate = false;
        this.SERVER_URL = ""; // "http://192.168.1.16:3000/";//pour les tests
        var now = new Date();
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 30, 0); //derniere commande 21h30
        this.toolate = now > end; //si true, ne peut plus faire de commande
    }
    WSProvider.prototype.getLocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log(pos);
                _this.location = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                };
            });
        }
    };
    WSProvider.prototype.setServerIP = function (ip) {
        this.SERVER_URL = "http://" + ip + ":3000"; //enregistre @DEV ONLY
    };
    WSProvider.prototype.canActivate = function () {
        if (this.isAuthenticate())
            return true;
        else
            this._route.navigate(["/login"]);
    };
    WSProvider.prototype.setAuthInfos = function (infos) {
        if (infos == null) {
            this.auth_token = null;
            return;
        }
        console.log(infos.token.token);
        this.auth_token = infos.token.token;
    };
    WSProvider.prototype.isAuthenticate = function () { return this.auth_token != null; };
    WSProvider.prototype.login = function (name, password) {
        return this.sendToServer("/api/login", "post", { name: name, password: password });
    };
    WSProvider.prototype.createUser = function (name, email) {
        return this.sendToServer("/api/createuser", "post", { name: name, password: email });
    };
    WSProvider.prototype.loadUserDetails = function () {
        return this.sendGetToServer("/api/client/user");
    };
    WSProvider.prototype.saveUserDetails = function (user) {
        return this.sendToServer("/api/client/user", "post", user);
    };
    WSProvider.prototype.loadLastNewsExcerpt = function (offset) {
        return this.sendGetToServer("/api/client/lastnewsexcerpt?offset=" + offset);
    };
    WSProvider.prototype.loadNews = function (id) {
        return this.sendGetToServer("/api/client/news/" + id);
    };
    WSProvider.prototype.postNewsComment = function (id, msg) {
        return this.sendToServer("/api/client/news/" + id, 'post', { msg: msg });
    };
    WSProvider.prototype.getPizzasList = function () {
        var _this = this;
        if (this.pizzas.length > 0)
            return Promise.resolve(this.pizzas);
        return this.sendGetToServer("/api/client/pizzas").then(function (dt) {
            _this.pizzas = dt;
            return dt;
        });
    };
    WSProvider.prototype.loadPizza = function (id) {
        return this.sendGetToServer("/api/client/pizzas/" + id);
    };
    WSProvider.prototype.postPizzaComment = function (id, msg, note) {
        return this.sendToServer("/api/client/pizzas/" + id, 'post', { msg: msg, note: note });
    };
    //PAYPAL: recupere un token client pour le paiement
    WSProvider.prototype.getClientToken = function () {
        return this.sendGetToServer("/api/client/client_token");
    };
    WSProvider.prototype.getPizzaById = function (id, pizzas) {
        for (var _i = 0, pizzas_1 = pizzas; _i < pizzas_1.length; _i++) {
            var p = pizzas_1[_i];
            console.log(p);
            if (p && p.id == id)
                return p;
        }
    };
    WSProvider.prototype.postCommand = function (payementid, card, date_retrait, message) {
        //renvois les infos de la card       
        var pizzas = this.pizzas;
        var cardarr = [];
        console.log(card);
        for (var _i = 0, _a = card.pizzas; _i < _a.length; _i++) {
            var pizza = _a[_i];
            console.log(pizza);
            var com = {
                id: pizza.pizza.id,
                nom: pizza.pizza.nom,
                small: pizza.small,
                big: pizza.big
            };
            cardarr.push(com);
        }
        //infos autre:
        var commande = {
            nonce: payementid,
            pizzas: cardarr,
            retrait: date_retrait,
            message: message,
            location: this.location
        };
        return this.sendToServer("/api/client/commande", "post", commande);
    };
    WSProvider.prototype.sendGetToServer = function (url, datas) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        console.log("Authoticate: " + this.auth_token);
        if (this.auth_token) {
            headers.append('Authorization', this.auth_token); // also tried other types to test if its working with other types, but no luck
        }
        return this._http.get(this.SERVER_URL + url, { headers: headers }).toPromise().then(function (dt) {
            var d = dt.json();
            console.log(d);
            if (!d)
                throw ("no datas");
            return d;
        });
    };
    WSProvider.prototype.sendToServer = function (url, method, datas) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        console.log("Authoticate: " + this.auth_token);
        if (this.auth_token) {
            headers.append('Authorization', this.auth_token); // also tried other types to test if its working with other types, but no luck
        }
        return this._http.post(this.SERVER_URL + url, datas || {}, { headers: headers }).toPromise().then(function (dt) {
            var d = dt.json();
            if (!d)
                throw ("no datas");
            return d;
        });
    };
    return WSProvider;
}());
WSProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], WSProvider);
exports.WSProvider = WSProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3MucHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cy5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzQ0FBNEM7QUFDNUMsMENBQXVDO0FBQ3ZDLHVDQUFxQztBQUdyQzs7R0FFRztBQUdILElBQWEsVUFBVTtJQXdCbkIsb0JBQW9CLEtBQVUsRUFBVSxNQUFhO1FBQ2pELHFCQUFxQjtRQURMLFVBQUssR0FBTCxLQUFLLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBdkJyRCxlQUFVLEdBQVUsSUFBSSxDQUFDLENBQUEsNEJBQTRCO1FBQ3JELFdBQU0sR0FBRyxFQUFFLENBQUMsQ0FBQSw4Q0FBOEM7UUFDMUQsYUFBUSxHQUFRO1lBQ0osUUFBUSxFQUFDLFNBQVM7WUFDbEIsU0FBUyxFQUFDLENBQUMsUUFBUTtTQUN0QixDQUFDO1FBY1YsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsRUFBRSxDQUFDLENBQUEsK0NBQStDO1FBTzNELElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLHlCQUF5QjtRQUNyRyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQSx5Q0FBeUM7SUFNdEUsQ0FBQztJQTVCRCxnQ0FBVyxHQUFYO1FBQUEsaUJBVUM7UUFURyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN4QixTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQUMsR0FBRztnQkFDekMsT0FBTyxDQUFD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QUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUN4RixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFbEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTFCLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUE5TEQsSUE4TEM7QUE5TFksVUFBVTtJQUR0QixpQkFBVSxFQUFFO3FDQXlCaUIsV0FBSSxFQUFpQixlQUFNO0dBeEI1QyxVQUFVLENBOEx0QjtBQTlMWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cCwgSGVhZGVyc30gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG5cbmltcG9ydCB7IENhbkFjdGl2YXRlIH0gICAgZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8qKlxuICogUHJvdmlkZXIgZCdhY2NlcyBhdSB3ZWJzZXJ2aWNlIGR1IHNpdGUgcGl6emFzXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdTUHJvdmlkZXIgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZXtcbiAgICBhdXRoX3Rva2VuOnN0cmluZyA9IG51bGw7Ly9wYXIgZGVmYXV0LCBub24gaWRlbnRpZmllclxuICAgIHBpenphcyA9IFtdOy8vcG91ciBldml0ZXIgZGVzIGxlcyByZWNoYXJnZXIgYSBjaGFxdWUgZm9pcyBcbiAgICBsb2NhdGlvbjphbnkgPSAge1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOjQzLjY2OTA3MCxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6LTEuMTA1MzU2XG4gICAgICAgICAgICB9O1xuXG4gICAgZ2V0TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvcyk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3MpXG4gICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uID17XG4gICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOnBvcy5jb29yZHMubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTpwb3MuY29vcmRzLmxvbmdpdHVkZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvb2xhdGUgPSBmYWxzZTtcbiAgICBTRVJWRVJfVVJMID0gXCJcIjsvLyBcImh0dHA6Ly8xOTIuMTY4LjEuMTY6MzAwMC9cIjsvL3BvdXIgbGVzIHRlc3RzXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6SHR0cCwgcHJpdmF0ZSBfcm91dGU6Um91dGVyKXtcbiAgICAgICAgLy90aGlzLmdldExvY2F0aW9uKCk7XG5cblxuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGVuZCA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLG5vdy5nZXRNb250aCgpLG5vdy5nZXREYXRlKCksIDIxLDMwLDApOy8vZGVybmllcmUgY29tbWFuZGUgMjFoMzBcbiAgICAgICAgdGhpcy50b29sYXRlID0gbm93ID4gZW5kOy8vc2kgdHJ1ZSwgbmUgcGV1dCBwbHVzIGZhaXJlIGRlIGNvbW1hbmRlXG4gICAgICAgXG5cbiAgICAgICAgXG5cblxuICAgIH1cbiAgICBzZXRTZXJ2ZXJJUChpcCl7XG4gICAgICAgIHRoaXMuU0VSVkVSX1VSTCA9IFwiaHR0cDovL1wiK2lwK1wiOjMwMDBcIjsvL2VucmVnaXN0cmUgQERFViBPTkxZXG4gICAgfVxuXG4gICAgXG4gICAgY2FuQWN0aXZhdGUoKSB7ICAgIFxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGUoKSkgcmV0dXJuIHRydWU7XG4gICAgICAgIGVsc2UgdGhpcy5fcm91dGUubmF2aWdhdGUoW1wiL2xvZ2luXCJdKVxuICAgIH1cblxuXG4gICAgcHVibGljIHNldEF1dGhJbmZvcyhpbmZvcyl7XG4gICAgICAgIGlmKGluZm9zID09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5hdXRoX3Rva2VuID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhpbmZvcy50b2tlbi50b2tlbilcbiAgICAgICAgdGhpcy5hdXRoX3Rva2VuID0gaW5mb3MudG9rZW4udG9rZW47XG5cbiAgICB9XG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlKCk6Ym9vbGVhbntyZXR1cm4gdGhpcy5hdXRoX3Rva2VuIT1udWxsO31cbiAgIFxuICAgXG4gICBcbiAgIFxuICAgIHB1YmxpYyBsb2dpbihuYW1lLCBwYXNzd29yZCk6UHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVG9TZXJ2ZXIoXCIvYXBpL2xvZ2luXCIsXCJwb3N0XCIse25hbWU6bmFtZSwgcGFzc3dvcmQ6cGFzc3dvcmR9KTtcbiAgICB9XG4gICAgcHVibGljIGNyZWF0ZVVzZXIobmFtZSwgZW1haWwpOlByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRvU2VydmVyKFwiL2FwaS9jcmVhdGV1c2VyXCIsXCJwb3N0XCIse25hbWU6bmFtZSwgcGFzc3dvcmQ6ZW1haWx9KTtcbiAgICB9XG4gICAgcHVibGljIGxvYWRVc2VyRGV0YWlscygpOlByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEdldFRvU2VydmVyKFwiL2FwaS9jbGllbnQvdXNlclwiKTtcbiAgICB9XG4gICAgcHVibGljIHNhdmVVc2VyRGV0YWlscyh1c2VyOmFueSk6UHJvbWlzZTxhbnk+e1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVG9TZXJ2ZXIoXCIvYXBpL2NsaWVudC91c2VyXCIsXCJwb3N0XCIsdXNlcik7XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBsb2FkTGFzdE5ld3NFeGNlcnB0KG9mZnNldCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRHZXRUb1NlcnZlcihcIi9hcGkvY2xpZW50L2xhc3RuZXdzZXhjZXJwdD9vZmZzZXQ9XCIrb2Zmc2V0KTtcbiAgICB9XG4gICAgcHVibGljIGxvYWROZXdzKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEdldFRvU2VydmVyKFwiL2FwaS9jbGllbnQvbmV3cy9cIitpZCk7XG4gICAgfVxuICAgIHB1YmxpYyBwb3N0TmV3c0NvbW1lbnQoaWQsIG1zZyl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUb1NlcnZlcihcIi9hcGkvY2xpZW50L25ld3MvXCIraWQsJ3Bvc3QnLHttc2c6bXNnfSk7XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBnZXRQaXp6YXNMaXN0KCl7XG4gICAgICAgIGlmKHRoaXMucGl6emFzLmxlbmd0aD4wKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGl6emFzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEdldFRvU2VydmVyKFwiL2FwaS9jbGllbnQvcGl6emFzXCIpLnRoZW4oZHQ9PntcbiAgICAgICAgICAgIHRoaXMucGl6emFzID0gZHQ7XG4gICAgICAgICAgICByZXR1cm4gZHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZFBpenphKGlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEdldFRvU2VydmVyKFwiL2FwaS9jbGllbnQvcGl6emFzL1wiK2lkKTtcbiAgICB9XG4gICAgcHVibGljIHBvc3RQaXp6YUNvbW1lbnQoaWQsIG1zZywgbm90ZSl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUb1NlcnZlcihcIi9hcGkvY2xpZW50L3Bpenphcy9cIitpZCwncG9zdCcse21zZzptc2csIG5vdGU6bm90ZX0pO1xuICAgIH1cblxuXG4gICAgLy9QQVlQQUw6IHJlY3VwZXJlIHVuIHRva2VuIGNsaWVudCBwb3VyIGxlIHBhaWVtZW50XG4gICAgcHVibGljIGdldENsaWVudFRva2VuKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRHZXRUb1NlcnZlcihcIi9hcGkvY2xpZW50L2NsaWVudF90b2tlblwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBpenphQnlJZChpZCwgcGl6emFzKXtcbiAgICAgICAgZm9yIChsZXQgcCBvZiBwaXp6YXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cocClcbiAgICAgICAgICAgIGlmKHAgJiYgcC5pZCA9PSBpZCkgcmV0dXJuIHA7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcHVibGljIHBvc3RDb21tYW5kKHBheWVtZW50aWQsIGNhcmQsIGRhdGVfcmV0cmFpdCwgbWVzc2FnZSl7XG4gICAgICAgXG4gICAgICAgIC8vcmVudm9pcyBsZXMgaW5mb3MgZGUgbGEgY2FyZCAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICBsZXQgcGl6emFzID0gdGhpcy5waXp6YXM7XG4gICAgICAgICAgICBsZXQgY2FyZGFyciA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjYXJkKVxuICAgICAgICAgICAgZm9yIChsZXQgcGl6emEgb2YgY2FyZC5waXp6YXMpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpenphKVxuICAgICAgICAgICAgICAgIGxldCBjb20gPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBwaXp6YS5waXp6YS5pZCxcbiAgICAgICAgICAgICAgICAgICAgbm9tOiBwaXp6YS5waXp6YS5ub20sXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsOiBwaXp6YS5zbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgYmlnOnBpenphLmJpZ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FyZGFyci5wdXNoKGNvbSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vaW5mb3MgYXV0cmU6XG4gICAgICAgICAgICBsZXQgY29tbWFuZGUgPSB7XG4gICAgICAgICAgICAgICAgbm9uY2U6IHBheWVtZW50aWQsXG4gICAgICAgICAgICAgICAgcGl6emFzOiBjYXJkYXJyLFxuICAgICAgICAgICAgICAgIHJldHJhaXQ6IGRhdGVfcmV0cmFpdCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmxvY2F0aW9uXG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVG9TZXJ2ZXIoXCIvYXBpL2NsaWVudC9jb21tYW5kZVwiLFwicG9zdFwiLGNvbW1hbmRlKTtcbiAgICB9XG5cblxuICAgIFxuICAgIHByaXZhdGUgc2VuZEdldFRvU2VydmVyKHVybCxkYXRhcz86c3RyaW5nKXtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSAgbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRob3RpY2F0ZTogXCIrdGhpcy5hdXRoX3Rva2VuKVxuICAgICAgICBpZih0aGlzLmF1dGhfdG9rZW4pe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aF90b2tlbik7IC8vIGFsc28gdHJpZWQgb3RoZXIgdHlwZXMgdG8gdGVzdCBpZiBpdHMgd29ya2luZyB3aXRoIG90aGVyIHR5cGVzLCBidXQgbm8gbHVja1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLlNFUlZFUl9VUkwrdXJsLHsgaGVhZGVyczpoZWFkZXJzfSkudG9Qcm9taXNlKCkudGhlbihkdD0+e1xuICAgICAgICAgICAgbGV0IGQgPSBkdC5qc29uKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkKVxuICAgICAgICAgICAgaWYoIWQpIHRocm93IChcIm5vIGRhdGFzXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gZDsgIFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzZW5kVG9TZXJ2ZXIodXJsLCBtZXRob2QsIGRhdGFzPzphbnkpOlByb21pc2U8YW55PntcbiAgICAgICAgbGV0IGhlYWRlcnMgPSAgbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRob3RpY2F0ZTogXCIrdGhpcy5hdXRoX3Rva2VuKVxuICAgICAgICBpZih0aGlzLmF1dGhfdG9rZW4pe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aF90b2tlbik7IC8vIGFsc28gdHJpZWQgb3RoZXIgdHlwZXMgdG8gdGVzdCBpZiBpdHMgd29ya2luZyB3aXRoIG90aGVyIHR5cGVzLCBidXQgbm8gbHVja1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5TRVJWRVJfVVJMK3VybCxkYXRhc3x8e30seyBoZWFkZXJzOmhlYWRlcnN9KS50b1Byb21pc2UoKS50aGVuKGR0PT57XG4gICAgICAgICAgICBsZXQgZCA9IGR0Lmpzb24oKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIWQpIHRocm93IChcIm5vIGRhdGFzXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gZDsgIFxuICAgICAgICB9KTtcbiAgICB9XG59Il19