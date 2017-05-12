"use strict";
/**
 * Model de données pizzas
 */
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var pizzas = SEQ.define('pizzas',{
    id:{type:sequelize.INTEGER,primaryKey: true,autoIncrement: true },//identifiant unique de la recette
    nom:{type:sequelize.STRING},//le nom de la recette
    slogan:{type:sequelize.STRING},//phrase d'accroche
    long_desc:{type:sequelize.STRING},//description
    prix_small:{type:sequelize.NUMERIC},//prix taille "small"
    prix_big:{type:sequelize.NUMERIC},//prix taille "big"
    picture:{type:sequelize.STRING},
    active:{type:sequelize.BOOLEAN}//l'image/photo de la recette   
    }, 
    {
        tableName: 'pizzas',
        timestamps: false
    }
);



module.exports = pizzas;