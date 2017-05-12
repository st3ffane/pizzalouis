"use strict";

var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var category = SEQ.define('category',{
    nom:{type:sequelize.STRING},
    description:{type:sequelize.STRING},
    }, 
    {
        tableName: 'category',
        timestamps: false
    }
);
console.log("Category model:");
console.log(category)


module.exports = category;