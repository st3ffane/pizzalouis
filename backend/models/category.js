"use strict";

var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var category = SEQ.define('category',{
    nom:{type:sequelize.STRING,primaryKey: true},
    description:{type:sequelize.STRING},
    }, 
    {
        tableName: 'category',
        timestamps: false
    }
);


module.exports = category;