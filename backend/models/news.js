"use strict";
/**
 * Informations sur les commandes
 */
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var news = SEQ.define('news',{
    id:{type:sequelize.INTEGER,primaryKey: true,autoIncrement: true },
    title:{type:sequelize.STRING},
    texte:{type:sequelize.STRING},
    date_pub:{type:sequelize.DATE},
    picture:{type:sequelize.STRING},//a voir plus tard
    
    }, 
    {
        tableName: 'news',
        timestamps: false
    }
);



module.exports = news;