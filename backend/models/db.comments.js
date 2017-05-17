/**
 * db.comments.js
 * 
 * Les middlewares pour acceder aux informations relatives
 * aux commentaires
 */
var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");
var fs = require("fs");//acces fichier
var uuid = require('node-uuid');



//les models de tables
var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");
var cp = require("./commandes_pizzas");

function getNewCommentsCount(req,res,next){
    comments.count({
        where:{
            etat:"waiting"
        }
    }).then( dt=>{
        req._comments_count = dt;
        next();
    }).catch(err=>next(err));
}


module.exports = {
    getNewCommentsCount : getNewCommentsCount
}