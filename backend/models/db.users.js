/**
 * db.users.js
 * 
 * Les middlewares pour acceder aux informations relatives
 * aux clients
 */
var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");


//les models de tables
var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");
var cp = require("./commandes_pizzas");


/**
 * SELECT "users"."id", "users"."nom", "users"."prenom", "users"."login", "users"."passwrd", "users"."tel", "users"."mail",
 *        "commandes"."id" AS "commandes.id", "commandes"."date_cmd" AS "commandes.date_cmd", "commandes"."payement_id" AS "commandes.payement_id",
 *        "commandes"."message" AS "commandes.message", "commandes"."date_retrait" AS "commandes.date_retrait", "commandes"."location" AS "commandes.location",
 *        "commandes"."id_client" AS "commandes.id_client", 
 * 
 *        "commandes.news"."id" AS "commandes.news.id", "commandes.news"."qtte" AS "commandes.news.qtte",
 *        "commandes.news"."size" AS "commandes.news.size", "commandes.news.pizza"."id" AS "commandes.news.pizza.id",
 *        "commandes.news.pizza"."nom" AS "commandes.news.pizza.nom" 
 *        FROM "users" AS "users" LEFT OUTER JOIN "commandes" AS "commandes" ON "users"."id" = "commandes"."id_client" LEFT OUTER JOIN "news" AS "commandes.news" ON "commandes"."id" = "commandes.news"."id_commande" LEFT OUTER JOIN "pizzas" AS "commandes.news.pizza" ON "commandes.news"."id_pizza" = "commandes.news.pizza"."id" WHERE "users"."id" = '7';

 */

function listAllUsersSnapshot(req,res,next){
    //implemente le datatable WS
    let iDisplayStart = req.query.start || 0;
    let iDisplayLength = req.query.length || 10;
    let sSearch = req.query.search.value ;
    let iSortingCols = req.query.iSortingCols || 0;
    let sEcho = req.query.sEcho;
    let order = req.query.order;
    let columns = req.query.columns;

    let totalnews = 0;

    console.log("APPEL USERS API");
    users.count().then( (dt)=>{
        totalnews = dt;
        console.log("TOTAL USERS: ",totalnews);
        let orderby=" users.id DESC ";//par defaut, rien
        if(order && order.length>0){
            let who = order[0].column;
            let how = order[0].dir;

            orderby = columns[who].data+" "+how;
        }
        let strsearch = sSearch ? "WHERE nom ILIKE '"+sSearch+"%' " : "";

        //la requete SQL
        return SEQ.query(`SELECT users.id, users.nom, users.prenom, users.tel ,users.mail ,coalesce(commandes.count,0) as commandesCount, coalesce(comments.count,0) as commentsCount 
        FROM users
        left outer join (SELECT id_user, count(*) from comments group by id_user ) as comments on(comments.id_user = users.id)
        left outer join( SELECT id_client,count(*) from commandes group by id_client) as commandes on(commandes.id_client = users.id)

        ${strsearch}
        ORDER BY ${orderby}
        LIMIT ${iDisplayLength}
        OFFSET ${iDisplayStart}
        ;
        `);
        // return users.findAll({
        //     attributes:["id","nom","prenom","tel","mail", [sequelize.fn("COUNT", sequelize.col("commandes.id")), "commandesCount"]
        //     , [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentsCount"]],
        //     include:[
        //         {
        //             model:commandes,
        //             attributes:[]
        //         },
        //         {
        //             model:comments,
        //             attributes:[]
        //         }
        //     ],
        //     group:["users.id","nom","prenom","tel","mail" ]
        // });
    
    }).then(dt=>{
        console.log(dt[0])
        req._users ={
            recordsTotal: totalnews,//totalnews, //a voir
            recordsFiltered : totalnews,
            sEcho:sEcho,

            aaData:dt[0]
        } ;
        
        next();
    }).catch(err=>next(err));
}
//recupere les infos sur un utilisateur 
//ainsi que ces commandes et ses messages 
function getUserDetails(req,res,next){
    req.checkParams('id').isInt();
    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            //la liste des users 
            res.redirect("/admin/users");
            return;
        }
        return users.find({
            include:[
                
                {
                    model:comments,
                    
                },
                {
                    model:commandes,
                    include:[
                        {
                            model: cp,
                            attributes:["qtte","size"],
                            include:[{
                                model:pizza,
                                attributes:["nom"]
                            }]
                        }
                    ]
                }
            ],
            where:{
                id: req.params.id
            }
        });
    }).then( dt=>{

        let client = dt.dataValues;
        console.log(client)
        client.commandes = client.commandes.map(el=>{
            let e = el.dataValues;
            console.log(e);
            
            e.pizzas = el.commandes_pizzas.map(p=>{
                let dv = p.dataValues;
                let pz = {
                    qtte: dv.qtte,
                    size: dv.size,
                    pizza: dv.pizza.dataValues.nom
                };
                return pz;
                
            
            });
            return e;
        });
        client.comments = client.comments.map(el=>el.dataValues);
        req._user= client;
        
        next();
    }).catch(err=>next(err));
    
    
}


module.exports = {
    listAllUsersSnapshot:listAllUsersSnapshot,
    getUserDetails:getUserDetails,

}