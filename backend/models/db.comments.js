/**
 * db.comments.js
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

function getNewCommentsCount(req,res,next){
    comments.count({
        where:{
            etat:"waiting"
        }
    }).then( dt=>{
        req._comments_count = dt;
        next();
    }).catch(err=>next(err));
}

//implemente le WS datatables
function listAllCommentsSwnapshot(req,res,next){
    let iDisplayStart = req.query.start || 0;
    let iDisplayLength = req.query.length || 10;
    let sSearch = req.query.search.value ;
    let iSortingCols = req.query.iSortingCols || 0;
    let sEcho = req.query.sEcho;
    let order = req.query.order;
    let columns = req.query.columns;

    let totalnews = 0;
    //compte toutes les commandes possibles avec les parametres donnés
    comments.count({
        where:{

        }
    }).then(dt=>{
        totalnews = dt;
        //parametres de la requete 
        // let orderby="date_pub DESC";//par defaut, les dernieres en premier
        // if(order && order.length>0){
        //     let who = order[0].column;
        //     let how = order[0].dir;

        //     orderby = columns[who].data+" "+how;
        // }
        // let strsearch = sSearch ? "WHERE title ILIKE '"+sSearch+"%' " : "";

        return comments.findAll({
            attributes:['id',"date","texte",'etat'],
            where:{

            },
            include:[
                {
                    model:users,
                    attributes:["id","nom","prenom"],
                    where:{

                    }
                }
            ],
            order:[['date','desc']],
            limit:iDisplayLength,
            offset:iDisplayStart
        })

    }).then(dt=>{
        console.log(dt);
        let c = dt.map(el=>{
            let e = el.dataValues;
            e.client = e.user.dataValues;//la personne qui a posté le comment
            return e;
        })
        req._comments ={
            recordsTotal: totalnews,//totalnews, //a voir
            recordsFiltered : totalnews,
            sEcho:sEcho,

            aaData:c
        } ;
        
        next();}).catch(err=>next(err));


  
}

module.exports = {
    getNewCommentsCount : getNewCommentsCount,
    listAllCommentsSwnapshot: listAllCommentsSwnapshot
}