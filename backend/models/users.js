"use strict";
var SEQ = require("./db_connect");
var sequelize = require("sequelize");




//define a new model
var users = SEQ.define('users',{
    id:{type:sequelize.INTEGER,primaryKey: true,autoIncrement: true },
    nom:{type:sequelize.STRING},
    prenom:{type:sequelize.STRING},
    login:{type:sequelize.STRING},
    passwrd:{type:sequelize.STRING},
    tel:{type:sequelize.STRING},
    mail:{type:sequelize.STRING},
    //location:{type:sequelize.GEOMETRY}

    }, 
    {
        tableName: 'users',
        timestamps: false
    }
);



module.exports = users;