/**
 * Router de l'application
 */
import {RouterModule} from "@angular/router";
import AccueilComponent from "./pages/accueil";
import RegisterComponent from "./pages/register";
import LoginComponent from "./pages/login";
import MainComponent from "./pages/main";
import CompteComponent from "./pages/compte";
import CompleteComponent from "./pages/fin";
import NewsComponent from "./pages/news";
import PizzasListComponent from './pages/pizzas.list';
import PizzaDetailsComponent from "./pages/pizza.details";
import PanierComponent from './pages/panier';


import {WSProvider } from "./ws.provider";

const routes = [
    /**/
    {
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
    },
    {
        path:"main",
        component:MainComponent,
        canActivate: [WSProvider]
    },
    {
        path:"**",
        redirectTo:"/login"
    },
]
export const Routing = RouterModule.forRoot(routes);