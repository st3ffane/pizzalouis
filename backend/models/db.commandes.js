/**
 * db.commandes.js
 * 
 * Les middlewares pour acceder aux informations relatives
 * aux commentaires
 */
var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");
var fs = require("fs");//acces fichier
var uuid = require('node-uuid');



//les models de tables
var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");
var cp = require("./commandes_pizzas");

function getNewCommandesCount(req,res,next){
    commandes.count({
        where:{
            date_retrait:{
                $gt: new Date()
            }
        }
    }).then( dt=>{
        req._commandes_count = dt;
        next();
    }).catch(err=>next(err));
}

function getCommandesInfosForToday(req,res,next){
    //renvois l'heure de la commande et le lieu de commande 
   SEQ.query(` SELECT location, date_retrait, id,
   `).then(dt=>{

        next();
    }).catch(err=>next(err));
}


function getCommandsSnapshot(req,res,next){
    let iDisplayStart = req.query.start || 0;
    let iDisplayLength = req.query.length || 10;
    let sSearch = req.query.search.value ;
    let iSortingCols = req.query.iSortingCols || 0;
    let sEcho = req.query.sEcho;
    let order = req.query.order;
    let columns = req.query.columns;

    let totalnews = 0;
    //etc....

    commandes.count().then(dt=>{
        totalnews = dt;
        let orderby=["date_retrait","DESC"];//par defaut, les dernieres en premier
        if(order && order.length>0){
            let who = order[0].column;
            let how = order[0].dir;

            let col_name = columns[who].data;
            orderby = [columns[who].data,how];
        }
        let strSearch = undefined;
        if(sSearch){
            //recherche le nom uniquement???
            strSearch={
                $or:{
                    nom:{$ilike:'%'+sSearch+'%'},
                    prenom:{$ilike:'%'+sSearch+'%'},
                }
            }
        }
        //recupere les commandes
        return commandes.findAll({
            where:{

            },
            include:[
                {
                    model: cp,
                    attributes:["qtte","size"],
                    include:[{
                        model:pizza,
                        attributes:["nom"]
                    }]
                },
                {
                    model: users,
                    attributes:['id','nom','prenom'],
                    where:strSearch
                }
            ],
            limit: iDisplayLength,
            offset: iDisplayStart,
            order:[orderby]
        });


    }).then(dt=>{
        let cs  = dt.map(el=>{
            let e = el.dataValues;
            
            e.pizzas = el.commandes_pizzas.map(p=>{
                let dv = p.dataValues;
                let pz = {
                    qtte: dv.qtte,
                    size: dv.size,
                    pizza: dv.pizza.dataValues.nom
                };
                return pz;
                
            
            });
            e.client = el.user.dataValues;
            return e;
        });
        req._commandes ={
            recordsTotal: totalnews,//totalnews, //a voir
            recordsFiltered : totalnews,
            sEcho:sEcho,

            aaData:cs
        } ;
        console.log(req._commandes);
        next();
    }).catch(err=>{
            console.log(err);    
            next(err);
        });
}

module.exports = {
    getNewCommandesCount : getNewCommandesCount,
    getCommandesInfosForToday : getCommandesInfosForToday,
    getCommandsSnapshot : getCommandsSnapshot
}