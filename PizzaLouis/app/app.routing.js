"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./pages/login/login.component");
var main_component_1 = require("./pages/main/main.component");
var createaccount_component_1 = require("./pages/createaccount/createaccount.component");
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
        path: "**",
        redirectTo: "/login"
    },
];
exports.navigableComponents = [
    login_component_1.LoginComponent,
    main_component_1.MainComponent,
    createaccount_component_1.CreateAccountComponent,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUE2RDtBQUM3RCw4REFBMEQ7QUFDMUQseUZBQXFGO0FBRXJGLHVEQUFtRDtBQUV0QyxRQUFBLE1BQU0sR0FBQztJQUNoQixFQUFDLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFDLGdDQUFjLEVBQUM7SUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxQ0k7SUFDSjtRQUNJLElBQUksRUFBQyxNQUFNO1FBQ1gsU0FBUyxFQUFDLDhCQUFhO1FBQ3ZCLFdBQVcsRUFBRSxDQUFDLHdCQUFVLENBQUM7S0FDNUI7SUFDRDtRQUNJLElBQUksRUFBQyxVQUFVO1FBQ2YsU0FBUyxFQUFDLGdEQUFzQjtLQUNuQztJQUNEO1FBQ0ksSUFBSSxFQUFDLElBQUk7UUFDVCxVQUFVLEVBQUMsUUFBUTtLQUN0QjtDQUNKLENBQUM7QUFDVyxRQUFBLG1CQUFtQixHQUFHO0lBQy9CLGdDQUFjO0lBQ2QsOEJBQWE7SUFDYixnREFBc0I7Q0FDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9naW5Db21wb25lbnR9IGZyb20gXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNYWluQ29tcG9uZW50fSBmcm9tIFwiLi9wYWdlcy9tYWluL21haW4uY29tcG9uZW50XCI7XG5pbXBvcnQge0NyZWF0ZUFjY291bnRDb21wb25lbnR9IGZyb20gJy4vcGFnZXMvY3JlYXRlYWNjb3VudC9jcmVhdGVhY2NvdW50LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7V1NQcm92aWRlcn0gZnJvbSBcIi4vc2hhcmVkL3dzL3dzLnByb3ZpZGVyXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXM9W1xuICAgIHtwYXRoOiBcIlwiLFxuICAgICBjb21wb25lbnQ6TG9naW5Db21wb25lbnR9LFxuICAgICBcbiAgICAvKiAge1xuICAgICAgICBwYXRoOidsb2dpbicsXG4gICAgICAgIGNvbXBvbmVudDpMb2dpbkNvbXBvbmVudFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOlwicmVnaXN0ZXJcIixcbiAgICAgICAgY29tcG9uZW50OlJlZ2lzdGVyQ29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCJjb21wdGVcIixcbiAgICAgICAgY29tcG9uZW50OkNvbXB0ZUNvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtXU1Byb3ZpZGVyXVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOlwibmV3cy86aWRcIixcbiAgICAgICAgY29tcG9uZW50Ok5ld3NDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbV1NQcm92aWRlcl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDpcImNvbXBsZXRlXCIsXG4gICAgICAgIGNvbXBvbmVudDpDb21wbGV0ZUNvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtXU1Byb3ZpZGVyXVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOlwicGl6emFzLzppZFwiLFxuICAgICAgICBjb21wb25lbnQ6UGl6emFEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW1dTUHJvdmlkZXJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCJwaXp6YXNcIixcbiAgICAgICAgY29tcG9uZW50OlBpenphc0xpc3RDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbV1NQcm92aWRlcl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDpcInBhbmllclwiLFxuICAgICAgICBjb21wb25lbnQ6UGFuaWVyQ29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW1dTUHJvdmlkZXJdXG4gICAgfSwqL1xuICAgIHtcbiAgICAgICAgcGF0aDpcIm1haW5cIixcbiAgICAgICAgY29tcG9uZW50Ok1haW5Db21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbV1NQcm92aWRlcl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDpcInJlZ2lzdGVyXCIsXG4gICAgICAgIGNvbXBvbmVudDpDcmVhdGVBY2NvdW50Q29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6XCIqKlwiLFxuICAgICAgICByZWRpcmVjdFRvOlwiL2xvZ2luXCJcbiAgICB9LFxuXTtcbmV4cG9ydCBjb25zdCBuYXZpZ2FibGVDb21wb25lbnRzID0gW1xuICAgIExvZ2luQ29tcG9uZW50LFxuICAgIE1haW5Db21wb25lbnQsXG4gICAgQ3JlYXRlQWNjb3VudENvbXBvbmVudCxcbl07Il19