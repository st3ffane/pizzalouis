/**
 * Router de l'application
 */
import {RouterModule} from "@angular/router";
import AccueilComponent from "./pages/accueil";
import RegisterComponent from "./pages/register";
import LoginComponent from "./pages/login";
import MainComponent from "./pages/main";

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
        path:"main",
        component:MainComponent
    },
    {
        path:"**",
        redirectTo:"/login"
    },
]
export default RouterModule.forRoot(routes);