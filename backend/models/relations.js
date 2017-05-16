/**
 * relation.js
 * 
 * Definition des relations entre les différentes tables
 * de la base de données
 */

var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");


//les models de tables
var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");
var cp = require("./commandes_pizzas");


//defini qqs tables en plus
// var pizza_ingredient = SEQ.define('pizza_ingredient',{
//     id_pizza:{type:sequelize.INTEGER},//identifiant unique de la recette
//     id_ingredient:{type:sequelize.INTEGER},//identifiant unique de la recette
    
//     }, 
//     {
//         tableName: 'pizza_ingredient',
//         timestamps: false
//     }
// );


//une pizza a un ingredient de base
pizza.belongsTo(ingredients,{foreignKey:"id_base", as:"base"});
//et des tops
pizza.belongsToMany(ingredients,{through:"pizza_ingredient", foreignKey:"id_pizza"});
ingredients.belongsToMany(pizza,{through:"pizza_ingredient", foreignKey:"id_ingredient"});

// //une pizza a des commentaires
pizza.belongsToMany(comments,{through:"comments_pizzas", foreignKey:"id_pizza"});
comments.belongsToMany(pizza,{through:"comments_pizzas", foreignKey:"id_comment"});

// //une pizza a une category
category.hasMany(pizza,{foreignKey:"id_category"});
pizza.belongsTo(category,{foreignKey:"id_category"});

// //une commande est passée par un client
users.hasMany(commandes,{foreignKey:"id_client"});

// //une commande a des pizzas
// commandes.belongsToMany(pizza,{through:"commandes_pizzas", foreignKey:"id_pizza"});
// pizza.belongsToMany(commandes,{through:"commandes_pizzas", foreignKey:"id_commande"});
cp.belongsTo(commandes,{foreignKey:"id_commande"});
cp.belongsTo(pizza,{foreignKey:"id_pizza"});
pizza.hasMany(cp,{foreignKey:"id_pizza"});
commandes.hasMany(cp,{foreignKey:"id_commande"});


// //les news ont des commentaires aussi 
news.belongsToMany(comments,{through:"comments_news", foreignKey:"id_news"});
comments.belongsToMany(news,{through:"comments_news", foreignKey:"id_comment"});


// //un utilisateur peut poster des commentaires
users.hasMany(comments,{foreignKey:"id_user"});
comments.belongsTo(users,{foreignKey:"id_user"});

