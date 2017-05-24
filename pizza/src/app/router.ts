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
        component:CompteComponent
    },
    {
        path:"news/:id",
        component:NewsComponent
    },
    {
        path:"complete",
        component:CompleteComponent
    },
    {
        path:"pizzas/:id",
        component:PizzaDetailsComponent
    },
    {
        path:"pizzas",
        component:PizzasListComponent
    },
    {
        path:"panier",
        component:PanierComponent
    },
    {
        path:"main",
        component:MainComponent
    },
    {
        path:"**",
        redirectTo:"/login"
    },
]
export default RouterModule.forRoot(routes);