/**
 * Connection a la base de données 
 */
//import de l'ORM pour la connection
var sequelize = require('sequelize');
//connection à la base
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

//exporte la connection
module.exports = SEQ;