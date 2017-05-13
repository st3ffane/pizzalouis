"use strict";
/**
 * Informations sur les commandes
 */
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var cp = SEQ.define('commandes_pizzas',{
    qtte:{type:sequelize.INTEGER},//combien de pizzas
    size:{type:sequelize.BOOLEAN},//true = big
    
    }, 
    {
        tableName: 'commandes_pizzas',
        timestamps: false
    }
);



module.exports = cp;