"use strict";
/**
 * Les ingredients composant une pizza
 */
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var ingredients = SEQ.define('ingredients',{
    id:{type:sequelize.INTEGER,primaryKey: true,autoIncrement: true },
    nom:{type:sequelize.STRING},
    type:{type:sequelize.STRING},
    description:{type:sequelize.STRING},
    icon:{type:sequelize.STRING},
    dispo:{type:sequelize.BOOLEAN}//disponnibilité: indique si peut ou pas réaliser la recette
    }, 
    {
        tableName: 'ingredients',
        timestamps: false
    }
);



module.exports = ingredients;