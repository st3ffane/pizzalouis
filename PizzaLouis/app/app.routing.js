"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./pages/login/login.component");
var main_component_1 = require("./pages/main/main.component");
var createaccount_component_1 = require("./pages/createaccount/createaccount.component");
var details_component_1 = require("./pages/details/details.component");
var ws_provider_1 = require("./shared/ws/ws.provider");
exports.routes = [
    { path: "",
        component: login_component_1.LoginComponent },
    /*  {
        path:'login',
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"compte",
        component:CompteComponent,
        canActivate: [WSProvider]
    },
    {
        path:"news/:id",
        component:NewsComponent,
        canActivate: [WSProvider]
    },
    {
        path:"complete",
        component:CompleteComponent,
        canActivate: [WSProvider]
    },
    {
        path:"pizzas/:id",
        component:PizzaDetailsComponent,
        canActivate: [WSProvider]
    },
    {
        path:"pizzas",
        component:PizzasListComponent,
        canActivate: [WSProvider]
    },
    {
        path:"panier",
        component:PanierComponent,
        canActivate: [WSProvider]
    },*/
    {
        path: "main",
        component: main_component_1.MainComponent,
        canActivate: [ws_provider_1.WSProvider]
    },
    {
        path: "register",
        component: createaccount_component_1.CreateAccountComponent
    },
    {
        path: "pizzas/:id",
        component: details_component_1.DetailsComponent,
        canActivate: [ws_provider_1.WSProvider]
    },
    {
        path: "**",
        redirectTo: "/login"
    },
];
exports.navigableComponents = [
    login_component_1.LoginComponent,
    main_component_1.MainComponent,
    createaccount_component_1.CreateAccountComponent,
    details_component_1.DetailsComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUE2RDtBQUM3RCw4REFBMEQ7QUFDMUQseUZBQXFGO0FBQ3JGLHVFQUFtRTtBQUVuRSx1REFBbUQ7QUFFdEMsUUFBQSxNQUFNLEdBQUM7SUFDaEIsRUFBQyxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBQyxnQ0FBYyxFQUFDO0lBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBcUNJO0lBQ0o7UUFDSSxJQUFJLEVBQUMsTUFBTTtRQUNYLFNBQVMsRUFBQyw4QkFBYTtRQUN2QixXQUFXLEVBQUUsQ0FBQyx3QkFBVSxDQUFDO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUMsVUFBVTtRQUNmLFNBQVMsRUFBQyxnREFBc0I7S0FDbkM7SUFDRDtRQUNJLElBQUksRUFBQyxZQUFZO1FBQ2pCLFNBQVMsRUFBQyxvQ0FBZ0I7UUFDMUIsV0FBVyxFQUFFLENBQUMsd0JBQVUsQ0FBQztLQUM1QjtJQUNEO1FBQ0ksSUFBSSxFQUFDLElBQUk7UUFDVCxVQUFVLEVBQUMsUUFBUTtLQUN0QjtDQUNKLENBQUM7QUFDVyxRQUFBLG1CQUFtQixHQUFHO0lBQy9CLGdDQUFjO0lBQ2QsOEJBQWE7SUFDYixnREFBc0I7SUFDdEIsb0NBQWdCO0NBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xvZ2luQ29tcG9uZW50fSBmcm9tIFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7TWFpbkNvbXBvbmVudH0gZnJvbSBcIi4vcGFnZXMvbWFpbi9tYWluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDcmVhdGVBY2NvdW50Q29tcG9uZW50fSBmcm9tICcuL3BhZ2VzL2NyZWF0ZWFjY291bnQvY3JlYXRlYWNjb3VudC5jb21wb25lbnQnO1xuaW1wb3J0IHtEZXRhaWxzQ29tcG9uZW50fSBmcm9tIFwiLi9wYWdlcy9kZXRhaWxzL2RldGFpbHMuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7V1NQcm92aWRlcn0gZnJvbSBcIi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXM9W1xuICAgIHtwYXRoOiBcIlwiLFxuICAgICBjb21wb25lbnQ6TG9naW5Db21wb25lbnR9LFxuICAgICBcbiAgICAvKiAge1xuICAgICAgICBwYXRoOidsb2dpbicsXG4gICAgICAgIGNvbXBvbmVudDpMb2dpbkNvbXBvbmVudFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOlwicmVnaXN0ZXJcIixcbiAgICAgICAgY29tcG9uZW50OlJlZ2lzdGVyQ29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCJjb21wdGVcIixcbiAgICAgICAgY29tcG9uZW50OkNvbXB0ZUNvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtXU1Byb3ZpZGVyXVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOlwibmV3cy86aWRcIixcbiAgICAgICAgY29tcG9uZW50Ok5ld3NDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbV1NQcm92aWRlcl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDpcImNvbXBsZXRlXCIsXG4gICAgICAgIGNvbXBvbmVudDpDb21wbGV0ZUNvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtXU1Byb3ZpZGVyXVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOlwicGl6emFzLzppZFwiLFxuICAgICAgICBjb21wb25lbnQ6UGl6emFEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW1dTUHJvdmlkZXJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCJwaXp6YXNcIixcbiAgICAgICAgY29tcG9uZW50OlBpenphc0xpc3RDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbV1NQcm92aWRlcl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDpcInBhbmllclwiLFxuICAgICAgICBjb21wb25lbnQ6UGFuaWVyQ29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW1dTUHJvdmlkZXJdXG4gICAgfSwqL1xuICAgIHtcbiAgICAgICAgcGF0aDpcIm1haW5cIixcbiAgICAgICAgY29tcG9uZW50Ok1haW5Db21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbV1NQcm92aWRlcl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDpcInJlZ2lzdGVyXCIsXG4gICAgICAgIGNvbXBvbmVudDpDcmVhdGVBY2NvdW50Q29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCJwaXp6YXMvOmlkXCIsXG4gICAgICAgIGNvbXBvbmVudDpEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW1dTUHJvdmlkZXJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCIqKlwiLFxuICAgICAgICByZWRpcmVjdFRvOlwiL2xvZ2luXCJcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBuYXZpZ2FibGVDb21wb25lbnRzID0gW1xuICAgIExvZ2luQ29tcG9uZW50LFxuICAgIE1haW5Db21wb25lbnQsXG4gICAgQ3JlYXRlQWNjb3VudENvbXBvbmVudCxcbiAgICBEZXRhaWxzQ29tcG9uZW50XG5dOyJdfQ==