/**
 * Connection a la base de données
 * 
 */

var sequelize = require('sequelize');

var SEQ = new sequelize('pizzas','louis','admin',{
    host:"localhost",
    dialect:"postgres",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timestamps:false
});


module.exports = SEQ;