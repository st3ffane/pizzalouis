"use strict";
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var comments = SEQ.define('comments',{
    id:{type:sequelize.INTEGER,primaryKey: true,autoIncrement: true },
    date:{type:sequelize.DATE},
    texte:{type:sequelize.STRING},
    etat:{type:sequelize.STRING},
    note:{type:sequelize.INTEGER},//note de 0 a 5   

    }, 
    {
        tableName: 'comments',
        timestamps: false
    }
);



module.exports = comments;