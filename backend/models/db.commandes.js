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
    
   

        let orderby=["date_retrait","DESC"];//par defaut, les dernieres en premier
        let today = new Date();
        let start_day = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 00, 00);
        //recupere les commandes
        return commandes.findAll({
            where:{
                date_retrait:{
                    $gt:start_day
                }
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
                    
                }
            ],
            
            order:[orderby]
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
            let _commandes ={
                recordsTotal: cs.length,//totalnews, //a voir
                recordsFiltered : cs.length,
               
                aaData:cs
            } ;
            return _commandes; //renvoie les commandes déja passées pour aujourd'hui


        });
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

//save une commande, card: objet récupéré via l'appli
//mobile
/*
    card:{
        location:{
            latitude,
            longitude
        },
        id_pizza:[small_qtte, big_qtte]
    }

    date_cmd:{type:sequelize.DATE},
    payement_id:{type:sequelize.STRING},//a voir plus tard
    message:{type:sequelize.STRING},//un message pour cette commande si existe
    date_retrait:{type:sequelize.DATE},
    location:{type:sequelize.GEOMETRY}//depuis ou on a passé la commande
*/
function saveCommande(from, card, transaction, amount){
    //crée une nouvelle commande
    return SEQ.query(`
    INSERT INTO commandes(date_retrait,payement_id,message,id_client,location,prix)
    VALUES ('${card.retrait}','${transaction}','${card.message}',${from},'(${card.location.latitude},${card.location.longitude})',${amount}) RETURNING id;`).then(success=>{
        console.log(success);
        //recup le dernier id...
        let last_id = success[0].id;


      //commandes/pizzas
      let q = ["INSERT INTO commandes_pizzas VALUES"];
      for(let pizza of card.pizzas){
          if(pizza.small){
            q.push(`(${last_id},${pizza.id},${pizza.small},false)`);
            q.push(",");
          }
          if(pizza.big){
              q.push(`(${last_id},${pizza.id},${pizza.big},true)`);
              q.push(",");
          }
          
          
      }
      q.pop();
      q.push(";");
      return SEQ.query(q.join(' ')); 
    });
    /*return commandes.create({
        payement_id: transaction,
        message: card.message,
        date_retrait: new Date(card.retrait),
        location:{
            type:'point',
            coordinates:[card.location.latitude,card.location.longitude]
        },
        id_client: from
    });*/
}
//recupere le total de la commande
function getCommandeTotalAmount(pizzas){
    //recupe les ids des pizzas
    let ids = pizzas.map(el=>el.id);
    return pizza.findAll({
        attributes:['id','prix_small','prix_big'],
        where:{
            id:{
                $in:ids
            }
        }
    }).then( tarifs=>{
        //calcule la somme de la commande 
        let total = 0;
        for(let pizza of pizzas){
            //recupere les prix
            let price = getPizzaPriceById(pizza.id, tarifs);
            let small = pizza.small || 0;
            let big = pizza.big || 0;
            total += small * price.prix_small + big * price.prix_big;
        }
        
        return total;
    });
}


function getPizzaPriceById(id, prices){
    for (let p of prices){
        if(p.id == id) return p;
    }
    return {prix_small:0,prix_big:0};
}
module.exports = {
    getNewCommandesCount : getNewCommandesCount,
    getCommandesInfosForToday : getCommandesInfosForToday,
    getCommandsSnapshot : getCommandsSnapshot,


    saveCommande:saveCommande,
    getCommandeTotalAmount:getCommandeTotalAmount
}