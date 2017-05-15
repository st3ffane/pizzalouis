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
    
    let limit = "order by coalesce(avg(note),0) DESC limit 1";//par defaut, la meilleure reponse

    if(req.query.show && req.query.show=="all"){
        limit = "";
    }
    
    SEQ.query(`select pizzas.id, pizzas.nom, coalesce(avg(note),0) as avg
        from pizzas
        left outer join comments_pizzas as cp on(cp.id_pizza=pizzas.id)
        left outer join comments on (cp.id_comment=comments.id)
        group by (pizzas.id,pizzas.nom)        
        ${limit};`).then( dt=>{
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
    //le parametre de temps: MONTH (par defaut), WEEK, REPW ou REPH
    let title = "Evolution au cours des 30 derniers jours";
    let value = "MONTH";
    let type = "DATE";//le type de coords Y  

    let join = "date_trunc('day',date_retrait)=date_trunc('day',serie)";
    let serie = `generate_series(
        now()-interval '30 days',
        now(),
        '1 day') as serie`; //par defaut, le mois en cours 

    if(req.query.period){
        switch(req.query.period){
            case "YEAR":{
                serie = `generate_series(
                    now()-interval '12 months',
                    now(),
                    '1 month') as serie`;
                join = "date_trunc('month',date_retrait)=date_trunc('month',serie)";
                title="Evolution au cours des 12 derniers mois";
                type = "MONTH";
                value = "YEAR"
                break;
            }
            case 'WEEK':
            {
                //modifie uniquement serie 
                serie = `generate_series(
                    now()-interval '7 days',
                    now(),
                    '1 day') as serie`;
                title="Evolution au cours des 7 derniers jours";
                type = "DATE";
                value = "WEEK"
                break;
            }
            case 'REPW':
            {
                join = "extract(dow from date_retrait)=serie";
                serie = `generate_series(
                    0,
                    6) as serie`;
                title="Répartition des ventes par jour de la semaine";
                value = "REPW";
                type = "DAY";

                break;
            }
            case 'REPH':
            {
                join = "extract(hour from date_retrait)=serie";
                serie = `generate_series(
                    12,
                    23) as serie`;
                title="Répartition des ventes par heure de la journée";
                value = "REPH";
                type = "HOUR";
                break;
            }
            default:break;//rien 
        }
    }


    SEQ.query(`select serie, count(id)
        from commandes
        right outer join ${serie}
        on (${join})
        group by serie
        order by serie;`).then (dt=>{
            req._graph_title = title;
            req._graph_value = value;
            req._graph_type = type;
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
    //parametres: date_retrait de la commande 
    //le parametre de temps: MONTH (par defaut), WEEK, REPW ou REPH
    let pizza_select = [];//par defaut, toutes les commandes
    let join = "";//si demande une pizza

    let day = 6;//par defaut, samedi
    let value = "ALL";
    let pizza_value = -1;//par defaut, toutes les commandes 


    if(req.query.period){
        switch(req.query.period){
            case 'MONTH':{
                pizza_select.push(" date_retrait >= (now() - interval '30 days') ");
                value = 'ALL';
                break;
            }
            case 'WEEK':
            {
                //modifie uniquement serie 
                pizza_select.push(" date_retrait >= (now() - interval '7 days') ");                
                value = "WEEK"
                break;
            }
            case 'REPW':
            {
                //selectionne un jour de la semaine 
                day = req.query.DAY || 6;//defaut samedi 
                //verifie 
                try{
                    day = +day;//convertie
                    if(day<0 && day>6) day = 6;
                }catch(err) {day=6;}

                pizza_select.push(" extract(dow from date_retrait)="+day+" ");
                value = "REPW";

                break;
            }
            case 'REPH':
            {
                join = "extract(hour from date_retrait)=serie";
                serie = `generate_series(
                    12,
                    23) as serie`;
                value = "REPH";
                break;
            }
            default:break;//rien 
        }
    }

    //OU pizza particuliere
    if(req.query.pizza){
        try{
            pizza_value = +req.query.pizza;
            
        } catch (err){
            //nope;
        }
        if(pizza_value != -1){
            join = " join commandes_pizzas as cp on (cp.id_commande=commandes.id) ";
            pizza_select.push(" cp.id_pizza="+pizza_value);
        }

        
        
    }
    let query = `select location from commandes ${join} `;
    if(pizza_select.length > 0){
        query += "WHERE "+pizza_select.join(" AND ");
    }
    console.log(pizza_value);
    SEQ.query(query).then(dt=>{
        req._geo = dt[0];
        req._graph_value = value;
        req._day = day;
        req._pizza_value = pizza_value
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



/**
 * `select pizzas.id,serie, pizzas.nom, coalesce(sum(qtte),0) as sum
            from pizzas
            right outer join commandes_pizzas as cp
            on cp.id_pizza = pizzas.id
            right outer join commandes as c 
            on cp.id_commande = c.id
            right outer join ${serie}
            on ${join}
            group by (pizzas.id,pizzas.nom,serie)       
            order by serie 
        ${limit};`
 */
function getBestSellsM(req,res,next){
    
    let title = "Evolution au cours des 30 derniers jours";
    let value = "MONTH";
    let type = "DATE";//le type de coords Y  

    let join = "date_trunc('day',c.date_retrait)=date_trunc('day',serie)";
    let serie = `generate_series(
        now()-interval '30 days',
        now(),
        '1 day') as serie`; //par defaut, le mois en cours 

    if(req.query.period){
        switch(req.query.period){
            case 'WEEK':
            {
                //modifie uniquement serie 
                serie = `generate_series(
                    now()-interval '7 days',
                    now(),
                    '1 day') as serie`;
                title="Evolution au cours des 7 derniers jours";
                type = "DATE";
                value = "WEEK"
                break;
            }
            case 'YEAR':{
                serie = `generate_series(
                    now()-interval '12 months',
                    now(),
                    '1 month') as serie`;
                join = "date_trunc('month',date_retrait)=date_trunc('month',serie)";
                title="Evolution au cours des 12 derniers mois";
                type = "MONTH";
                value = "YEAR"
                break;
            }
            case 'REPW':
            {
                join = "extract(dow from date_retrait) = serie";
                serie = `generate_series(
                    0,
                    6) as serie`;
                title="Répartition des ventes par jour de la semaine";
                value = "REPW";
                type = "DAY";

                break;
            }
            case 'REPH':
            {
                join = "extract(hour from date_retrait)=serie";
                serie = `generate_series(
                    12,
                    23) as serie`;
                title="Répartition des ventes par heure de la journée";
                value = "REPH";
                type = "HOUR";
                break;
            }
            default:break;//rien 
        }
    }


    
    SEQ.query(`select pizzas.id,serie,pizzas.nom,coalesce(sum(qtte),0) as sum
            from ${serie}
            inner join pizzas on (true)
            left outer join commandes as c
            on (${join})
            left outer join commandes_pizzas as cp
            on (cp.id_commande = c.id and pizzas.id = cp.id_pizza)
            group by (pizzas.id, pizzas.nom, serie)
            order by (serie,pizzas.nom);`
        ).then(dt=>{

            //regroupe les données par date...
            var date = "";
            let current = null;
            let datas = [];

            for (let d of dt[0]){
                if(""+d.serie != date){
                    date = d.serie;
                    if(current) datas.push(current);
                    current = {
                        "period":date,
                        datas:[]
                    };
                }
                //ajoute les infos a current 
                current.datas.push(d);
            }
            //le dernier 
            if(current) datas.push(current);


            
        req._best_sell = datas;//le resultat de la requete
        req._graph_value = value;
        req._graph_type = type;
        next();
    }).catch(err=>{
        next(err);
    })
}


function getAllPizzas(req,res,next){
    pizza.findAll({
        attributes:["id","nom"]
    }).then( dt=>{
       
        req._pizzas = dt.map(el=>el.dataValues);
        next();
    }).catch(err=>next(err));
}

module.exports = {
    getTotalCommandesM : getTotalCommandesM,
    getBestSellsM : getBestSellsM,
    getBestStart : getBestStart,
    getSellDatas : getSellDatas,
    getIngredientsSells: getIngredientsSells,
    getBaseSells : getBaseSells,
    getGeolocCommands : getGeolocCommands,
    getAllPizzas : getAllPizzas,
};