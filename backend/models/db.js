"use strict";
/**
 * Création des relations entre les tables
 * generation des middlewares pour la recuperation des données
 * 
 */
var sequelize = require("sequelize");

var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");



//une pizza a un ingredient de base
pizza.belongsTo(ingredients,{foreignKey:"id_base", as:"base"});
//et des tops
 pizza.belongsToMany(ingredients,{through:"pizza_ingredient", foreignKey:"id_pizza"});
ingredients.belongsToMany(pizza,{through:"pizza_ingredient", foreignKey:"id_ingredient"});

// //une pizza a des commentaires
pizza.belongsToMany(comments,{through:"comments_pizzas", foreignKey:"id_pizza"});
comments.belongsToMany(pizza,{through:"comments_pizzas", foreignKey:"id_comment"});

// //une pizza a une category
pizza.belongsTo(category,{foreignKey:"nom"});

// //une commande est passée par un client
commandes.belongsTo(users,{foreignKey:"id_client"});

// //une commande a des pizzas
commandes.belongsToMany(pizza,{through:"commandes_pizzas", foreignKey:"id_pizza"});
pizza.belongsToMany(commandes,{through:"commandes_pizzas", foreignKey:"id_commande"});

// //les news ont des commentaires aussi 
news.belongsToMany(comments,{through:"comments_news", foreignKey:"id_news"});
comments.belongsToMany(news,{through:"comments_news", foreignKey:"id_comment"});


// //un utilisateur peut poster des commentaires
users.hasMany(comments,{foreignKey:"id_user"});








/**
 * Recupere une liste d'utilisateur
 */
function listUsers(req,res,next){

    let query = {};
    if(req.params.id) {
        query.where = {
            id:req.params.id
        }
        
    }
    else if(req.query){
        console.log("search name: "+req.query);
        query.where = {
            nom : req.query.nom ? {$ilike:"%"+req.query.nom+"%"} : undefined
        }
        console.log(query);

    }
    users.findAll(query).then(res=>{
        req._users = res;
        next();
    }).catch(err=>{
       next(err);
    });
}
/**
 * affiche la liste des comments
 */
// function listComments(req,res,next){
//     let q = req.query || {};
//     comments.findAll({
//         attributes:["id","date","texte","note"],
//         include:[{
//             model:users,
//             where:{
//                 id:q.id || 1
//             }
//         }]
//     }).then(res=>{
//         req._comments = res;
//         next();
//     }).catch(err=>{
//         next(err);
//     })
// }
function listComments(req,res,next){
    let q = req.query || {};
    let select = {
        where: q.id ? {id:q.id} : undefined,
        include:[{
            model:comments,
            
        }]
    };
    users.findAll(select).then(res=>{
        req._comments = res;
        next();
    }).catch(err=>{
        next(err);
    })
}

function listPizzas(req,res,next){
    let q = req.query || {};
    let select = {
        where: q.id ? {id:q.id} : undefined,
        include:[
            {
                model:ingredients,
                as:"base"            
        },
        {
            model:comments
        },
        {
                model:ingredients,
                as:"ingredients"            
        }]
    };
    pizza.findAll(select).then(res=>{
        req._pizzas = res;
        next();
    }).catch(err=>{
        next(err);
    })
}

module.exports = {
    listUsers: listUsers,
    listComments: listComments,
    listPizzas: listPizzas
}