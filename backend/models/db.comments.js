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


    let from_pizzas = req.query.from_pizzas;
    let from_news = req.query.from_news;

    console.log(from_pizzas,from_news)
    
    let opt = {};//par defaut, pas de condition 
    let attr = [];
    if(from_pizzas){
        opt = {
            include:[{
                model: pizza,
                where:{
                    id:from_pizzas
                }
            }]
        };
        attr=["nom"];


    } else if(from_news){
        opt = {
            include:[{
                model: news,
                
                where:{
                    id:from_news
                }
            }]
        };
        attr=["title"];
    }
    //compte toutes les commandes possibles avec les parametres donnés
    comments.count(opt).then(dt=>{
        totalnews = dt;
        //parametres de la requete 
        // let orderby="date_pub DESC";//par defaut, les dernieres en premier
        // if(order && order.length>0){
        //     let who = order[0].column;
        //     let how = order[0].dir;

        //     orderby = columns[who].data+" "+how;
        // }
        // let strsearch = sSearch ? "WHERE title ILIKE '"+sSearch+"%' " : "";

        let inc = [
                {
                    model:users,
                    attributes:["id","nom","prenom"],
                    where:{

                    }
                }
            ];
        if(opt.include){ 
            let more = opt.include[0];
            more.attributes=attr;
            inc.push(more);
        
        } else {
            //recherche les 2 possibles 
            inc.push({
                model:news,
                attributes:["title"]
            });
            inc.push({
                model:pizza,
                attribute:["nom"]
            })
        }


        
        return comments.findAll({
            attributes:['id',"date","texte",'etat'],
            
            include: inc,
            order:[['date','desc']],
            limit:iDisplayLength,
            offset:iDisplayStart
        })

    }).then(dt=>{
        
        let c = dt.map(el=>{
            let e = el.dataValues;
            e.client = e.user.dataValues;//la personne qui a posté le comment

            
            e.a_propos = 
                e.news && e.news.length> 0? {type:"news", nom:e.news[0].dataValues.title} : 
                e.pizzas && e.pizzas.length>0? {type:"pizza", nom: e.pizzas[0].dataValues.nom} : undefined;
            
            
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

function publishComment(req,res,next){
    req.checkBody("comment").isInt();
    req.checkBody("active").isBoolean();


    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            //rien...
            console.log("Erreur params, silently fail...");
            console.log(result.array())
            next("Invalid params");
            return;
        }
        else {
            console.log("update: ",req.body.active, req.body.comment);
            return comments.update({
                etat: req.body.active == 'true'? 'published' : 'waiting'
            },{
                where:{
                    id: req.body.comment
                }
            });
        }
    }).then( dt=>{
        next();
    }).catch(err=>next(err));
}
function deleteComment(req,res,next){

}


function addNewsComment(from, about, msg){
    return comments.create({
        texte:msg,
        id_user:from
    }).then(dt=>{
        //associe le comment a la news
        return SEQ.query("INSERT INTO comments_news(id_comment,id_news) VALUES ("+dt.id+","+about+");");
    });
}
function addPizzaComment(from,about,msg,note){
    return comments.create({
        texte:msg,
        id_user:from,
        note: note
    }).then(dt=>{
        //associe le comment a la news
        return SEQ.query("INSERT INTO comments_pizzas(id_comment,id_pizza) VALUES ("+dt.id+","+about+");");
    });
}
module.exports = {
    getNewCommentsCount : getNewCommentsCount,
    listAllCommentsSwnapshot: listAllCommentsSwnapshot,
    publishComment: publishComment,



    addNewsComment: addNewsComment,
    addPizzaComment: addPizzaComment
}