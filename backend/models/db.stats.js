"use strict";
/**
 * statistiques d'utilisation de l'appli
 * 
 */
var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");



var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");
var cp = require("./commandes_pizzas");

/**
 * le nbr total de commandes via l'appli 
 */
function getTotalCommandes(){
    return commandes.count();
}
/**
 * les informations sur les meilleures ventes 
 * 
 *  select pizzas.id, pizzas.nom,sum(qtte) 
from commandes_pizzas
join pizzas on (commandes_pizzas.id_pizza = pizzas.id)
group by (pizzas.id, pizzas.nom)
order by sum(qtte) DESC
limit 1;

 * @param bestonly: true/false : si true, ne renvoie que la meilleure
 * 
 * 
 * @return 
 */

function getBestSells(bestonly){
    bestonly = bestonly === undefined || true; // par defaut, ne renvoie que la meilleure 


    return SEQ.query(`select pizzas.id, pizzas.nom,sum(qtte) 
        from commandes_pizzas
        join pizzas on (commandes_pizzas.id_pizza = pizzas.id)
        group by (pizzas.id, pizzas.nom)
        order by sum(qtte) DESC
        limit 1;`);
}
/**
 * les meilleurs notes (pizzas)
 * select pizzas.id, pizzas.nom, avg(note)
from pizzas
join comments_pizzas as cp on(cp.id_pizza=pizzas.id)
join comments on (cp.id_comment=comments.id)
group by (pizzas.id,pizzas.nom)
order by avg(note) DESC
limit 1;

 * @param 
 * 
 * @return 
 * 
 */
function getBestStart(req,res,next){
    
    
    SEQ.query(`select pizzas.id, pizzas.nom, avg(note)
        from pizzas
        join comments_pizzas as cp on(cp.id_pizza=pizzas.id)
        join comments on (cp.id_comment=comments.id)
        group by (pizzas.id,pizzas.nom)
        order by avg(note) DESC
        limit 1;`).then( dt=>{
            req._best_star = dt[0];
            next();
        }).catch(err=>next(err));
}
/**
 * courbes de ventes
 * select serie, count(id)
from commandes
right outer join generate_series(
now()-interval '30 days',
now(),
'1 day') as serie
on (date_trunc('day',date_retrait)=date_trunc('day',serie))
group by serie;


 */
function getSellDatas(req,res,next){ 

    SEQ.query(`select serie, count(id)
        from commandes
        right outer join generate_series(
        now()-interval '30 days',
        now(),
        '1 day') as serie
        on (date_trunc('day',date_retrait)=date_trunc('day',serie))
        group by serie
        order by serie;`).then (dt=>{

            req._sell_datas = dt[0];
            next();

    }).catch(err=>next(err));
}

/**
 * Ingredients les + vendus
 * 
 *


select ingredients.nom,count(*) from ingredients
join pizza_ingredient as pi
    on (pi.id_ingredient=ingredients.id)
join pizzas on (pizzas.id=pi.id_pizza)
join commandes_pizzas as cp on(cp.id_pizza=pizzas.id)
join commandes on (commandes.id=cp.id_commande)
group by ingredients.nom;


select ingredients.nom,sum(qtte) from ingredients
join pizza_ingredient
as pi
on(pi.id_ingredient=ingredients.id)
join pizzas on (pizzas.id=pi.id_pizza)
join commandes_pizzas as cp on(cp.id_pizza=pizzas.id)
join commandes on (commandes.id=cp.id_commande)
group by ingredients.nom;

 */
function getIngredientsSells(req,res,next){
    SEQ.query(`select ingredients.nom,sum(qtte) from ingredients
        join pizza_ingredient
        as pi
        on(pi.id_ingredient=ingredients.id)
        join pizzas on (pizzas.id=pi.id_pizza)
        join commandes_pizzas as cp on(cp.id_pizza=pizzas.id)
        join commandes on (commandes.id=cp.id_commande)
        group by ingredients.nom
        order by sum(qtte) DESC
        limit 1;
        `).then(dt=>{
            req._ingredient_sell = dt[0];
            console.log(dt[0]);
            next();
        }).catch(err=>next(err));
}
function getBaseSells(req,res,next){
    SEQ.query(`select ingredients.nom,sum(qtte) from ingredients
        join pizzas on (pizzas.id_base=ingredients.id)
        left outer join commandes_pizzas as cp on(cp.id_pizza=pizzas.id)
        join commandes on (commandes.id=cp.id_commande)
        group by ingredients.nom
        order by sum(qtte) DESC
        limit 1;
        `).then(dt=>{
            req._base_sell = dt[0];
           
            next();
        }).catch(err=>next(err));
}

function getGeolocCommands(req,res,next){
    SEQ.query("select location from commandes;").then(dt=>{
        req._geo = dt[0];
         console.log(dt[0]);
        next();
    }).catch(err=>next(err));
}
//les middlewares 
function getTotalCommandesM(req,res,next){
    getTotalCommandes().then( dt=>{
        req._total_count = dt;
        next();
    }).catch(err=>{
        next(err);  
    });
}
function getBestSellsM(req,res,next){
    getBestSells().then(dt=>{
        req._best_sell = dt[0];//le resultat de la requete
        next();
    }).catch(err=>{
        next(err);
    })
}


module.exports = {
    getTotalCommandesM : getTotalCommandesM,
    getBestSellsM : getBestSellsM,
    getBestStart : getBestStart,
    getSellDatas : getSellDatas,
    getIngredientsSells: getIngredientsSells,
    getBaseSells : getBaseSells,
    getGeolocCommands : getGeolocCommands

};