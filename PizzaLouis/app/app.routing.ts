import {LoginComponent} from "./pages/login/login.component";
import {MainComponent} from "./pages/main/main.component";
import {CreateAccountComponent} from './pages/createaccount/createaccount.component';
import {DetailsComponent} from "./pages/details/details.component";

import {WSProvider} from "./shared/ws/ws.provider";

export const routes=[
    {path: "",
     component:LoginComponent},
     
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
        path:"main",
        component:MainComponent,
        canActivate: [WSProvider]
    },
    {
        path:"register",
        component:CreateAccountComponent
    },
    {
        path:"pizzas/:id",
        component:DetailsComponent,
        canActivate: [WSProvider]
    },
    {
        path:"**",
        redirectTo:"/login"
    },
];
export const navigableComponents = [
    LoginComponent,
    MainComponent,
    CreateAccountComponent,
    DetailsComponent
];