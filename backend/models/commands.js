"use strict";
/**
 * Informations sur les commandes
 */
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var commandes = SEQ.define('commandes',{
    id:{type:sequelize.INTEGER,primaryKey: true,autoIncrement: true },
    date_cmd:{type:sequelize.DATE},
    payement_id:{type:sequelize.STRING},//a voir plus tard
    message:{type:sequelize.STRING},//un message pour cette commande si existe
    date_retrait:{type:sequelize.DATE},
    location:{type:sequelize.GEOMETRY('Point')},//depuis ou on a passé la commande
    prix:{type:sequelize.FLOAT}
    }, 
    {
        tableName: 'commandes',
        timestamps: false
    }
);



module.exports = commandes;