"use strict";
/**
 * Création des relations entre les tables
 * generation des middlewares pour la recuperation des données
 * 
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
 * Middlewares d'acces et manipulation des données
 */
function getPizzasCount(req,res,next){
    //permet via query param de lister par category
    let category = req.query.category;
    let where = {};

    console.log("recherche categorie: ",category)
    if(category){
        where={
          
              'category':category
            
        };
    }


    pizza.count({where:where}).then( dt =>{
        req.pizzas_count = dt;
        next();
    }).catch(err=>{
        next(err);
    });
}

/**
 * recupere la liste de toutes les pizzas de la carte
 * ainsi que le nbr de reponses a la requete
 * 
 * organise suivant la categorie
 * query params:
 *  categrory: limite la recherche a une categorie STRING
 *  search: recherche textuelle dans le nom des pizzas STRING
 *  ingredients: identifiant d'ingredient INTEGER
 *  ingredient_name: recherche par nom d'ingredient STRING
 *  commandes_count: le nombre de fois ou la pizza a ete commandées (0/1) SMALLINT
 * 
 * resultats:
 * 
 * */
function listAllPizzasByCatgorie(req,res,next){
    
    let select = {        
        include:[
            {
                model:pizza,                

                include:[
                    {
                        model:ingredients
                    }
                ]
            }
        ]
    };
    let query = req.query;
    if(query.category) select.where={nom:req.query.category};
    if(query.search){ 
        let p = select.include[0];
        p.where = { nom:{ $ilike:"%"+query.search+"%" } };
    }
    //recupere la liste des pizzas par categories
    category.findAll(select).then(dt=>{
        req._pizzas = dt;
        next();
    }).catch(err=>{
        next(err);
    });
    
}



function listAllPizzas(req,res,next){
    pizza.findAll({
        attributes:["id","nom","slogan","prix_small","prix_big",'category',"ingredients"],
        include:[
            {
                model:ingredients,
                attributes:['nom']
            }
        ]
    }).then( dt=>{
        if(dt){
            console.log(p)
            req._pizzas = p;
            let p = dt.map(el=>{
                return el.dataValues;
            });
            console.log(p)
            req._pizzas = p;
        } 
        
        next();
    })
}





////////////// ADMINSITRATION //////////////////////////////////////////////
/**
 * recupere les infos pour afficher la liste des pizzas en administration
 * nom, slogan, les prix et les ingredients (simple array)
 * 
 * 
 */
//les pizzas CRU: pas de possibilité de suppression, uniquement desactivation

//les ingredients CRUD 
function listAllIngredientsSnapshot(req,res,next){
    ingredients.findAndCountAll({
        attributes:['id','nom','type','description','dispo'],

        include:[{
            model:pizza,
            attributes:[]
        }],
        
    }).then(dt=>{
        
        req._ingredients ={
            count: dt.count,
            ingredients: dt.rows.map(el=>{
               
                return el.dataValues;
            })
        } 
        next();
    
    }).catch(err=>next(err))
}
function saveOrUpdateIngredient(req,res,next){
    //validation des données du formulaire
    req.checkBody('id').optional().isInt();//id peut etre present, doit etre un entier (bigint)
    req.checkBody("title").notEmpty();//titre obligatoire
    req.checkBody('dispo').optional().isBoolean();//boolean disponnibilité
    //req.body.check('icon') image file, a voir plus tard....
    
    
    req.getValidationResult().then(result=>{
        if (!result.isEmpty()) {
            //redirige vers le formulaire avec une erreur  TODO
            console.log("Erreur de validations");
            console.log(util.inspect(result.array()))
            req._msg = "Erreur de validations";
            //revient sur la meme page... 
            res.redirect("/admin/ingredientedit");
            return;
        }
        //sauvegarde ou update l'ingredient 
        let infos = {
            id: req.body.id,
            nom: req.body.title,
            description: req.body.description,
            type:req.body.type,
            dispo: req.body.dispo || false,
            //icon url
        }

        ingredients.upsert(infos,{validate:true}).then( dt=>{
            //ok, continue
            req._msg="Modification sur la liste des ingredients réalisée avec succès!";
            next();
        }).catch(err=>{
            console.log("error", err);
            req._msg = err; 
            next();
            return;
        })
    })
}
function deleteIngredientById(req,res,next){
    if(!req.params.id){
        //nope
        res.redirect("/admin/ingredients");
        return;
    }

    
    ingredients.destroy({
        where:{
            id:req.params.id
        }
    }).then( dt=>{
        //suppression ok
        req._msg="Suppression de l'ingredient  OK!";
        next();
    }).catch(err=>{
        req._msg="Erreur lors de la suppression de l'ingredient: avant de pouvoir le supprimer, assurer vous qu'il n'est pas utilisé dans une recette! ";
        next();
    });
}
function getIngredientDetails(req,res,next){
    req.checkParams('id').isInt();
    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            //redirige vers la liste des ingredients
            res.redirect("/admin/ingredients");
            return;
        }
        //recup l'ingredient 
        return ingredients.findById(req.params.id);
    }).then(dt=>{
            if(!dt){
                //aucun resultat correspondant, retour a la liste
                res.redirect("/admin/ingredients");
                return;
            }
            req._ingredient = dt.dataValues;
            next();
    }).catch(err=>{
            //message d'erreur 
            req._error_msg="Erreur recuperation informations: "+err;
            next();
    });
}
function getIngredientsByType(req,res,next){
    //recupere tous les ingredients et enregistre dans ingredients ou bases
    ingredients.findAll().then( dt=>{
        let base = [];
        let ingredients = [];
        
        
        for (let ing of dt){
            let i = ing.dataValues;
            if(i.type == "top") ingredients.push(i);
            else base.push(i);
        }
        req._ingredients = ingredients;
        req._bases = base;
        next();
    }).catch(err=>{
        next(err);//gros bug!!!
    })
}

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
    //findAndCountAll ne fonctionne pas avec group by!!!! Tant pis
    users.count().then( (dt)=>{
        req._users = {count:dt};
        
        return users.findAll({
            attributes:["id","nom","prenom","tel","mail", [sequelize.fn("COUNT", sequelize.col("commandes.id")), "commandesCount"]
            , [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentsCount"]],
            include:[
                {
                    model:commandes,
                    attributes:[]
                },
                {
                    model:comments,
                    attributes:[]
                }
            ],
            group:["users.id","nom","prenom","tel","mail" ]
        });
    
    }).then(dt=>{
        
        let p = dt.map(el=>{
                let e = el.dataValues;
                // e.commandes = el.dataValues.commandes.length;
                // e.comments = el.dataValues.comments.length;
                return el.dataValues;
            });
        req._users.users = p;
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




//news: permet la création et publication?
/*
select id,title,date_pub,texte,counts.count
from news
left outer join (
 select id_news, count(id_news) from comments_news group by(id_news)) as counts
on id=counts.id_news;

*/
function listAllNewsSwnapshot(req,res,next){
    SEQ.query(`select id,title,date_pub,texte,counts.count
        from news
        left outer join (
        select id_news, count(id_news) from comments_news group by(id_news)) as counts
        on id=counts.id_news;`).then(dt=>{
    console.log(dt[0]);
        req._news = dt[0];
        console.log(req._news);
        next();
    }).catch(err=>next(err));
}
function saveNews(req,res,next){
    req.checkBody("title").notEmpty();//titre obligatoire
    req.checkBody('texte').notEmpty();

    console.log("Validating datas....")
    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            //error
            console.log("ine couille")
            next("Invalid datas");
        }
        let infos = {
            title: req.body.title,
            texte: req.body.texte,
            picture: "test.jpg"
        }
        console.log(infos)
        news.create(infos).then(dt=>{
            req._msg="Creation de la news OK";
            next();
        }).catch(err=>next(err));
    });
    
}






/**
 * Recupere la liste des commentaires
 * query params:
 *      from_user: id users
 *      from_news: id 
 *      from_pizza: id
 *      etat: all | waiting
 */
function listAllCommentsSwnapshot(req,res,next){
    //origine des comments, defaut: all 
    req.checkQuery("from_user").optional().isInt();
    req.checkQuery("from_news").optional().isInt();
    req.checkQuery("from_pizza").optional().isInt();

    req.checkQuery("etat").optional().isCommentWaiting();

    req.getValidationResult().then(result=>{
        //requete par defaut: only waiting 
        
        if(!result.isEmpty()){
            //a voir....
            let errors =  result.array();
            for(let err of errors){
                req.query[err.param] = null;//annule le parametre
            }
        }
        
       //limite a 1 utilisateur
        let user_limit = req.query.from_user ? {
                id : req.query.from_user  //si limite a 1 utilisateur en particulier
            } : null;

        //limite a 1 pizza
        let source= [
                {
                    model:users,
                    attributes:['id','nom','prenom'],
                    where: user_limit
                }
            ];
        
        if(req.query.from_pizza){
            source.push({
                model: pizza,
                attributes:[],
                where:{
                    id:req.query.from_pizza
                }
            });
            req.query.etat = "all";


        }else if(req.query.from_news){
            source.push({
                model: news,
                attributes:[],
                where:{
                    id:req.query.from_news
                }
            });
            req.query.etat = "all";
        }

        let params = user_limit || req.query.etat == "all" ?  null : {etat:"waiting"};



        return comments.findAll({
            attributes:["id","date","texte","etat"],
            where:params,
            include: source
        });
    }).then(dt=>{
        req._comments = dt.map(el=>{            
            return el.dataValues
        });
        next();
    }).catch(err=>next(err));
}

/**
 * Recupere une liste d'utilisateur
 */
function listUsers(req,res,next){

    let query = {};
    if(req.params.id) {
        query.where = {
            id:req.params.id
        }
        
    }
    else if(req.query){
        console.log("search name: "+req.query);
        query.where = {
            nom : req.query.nom ? {$ilike:"%"+req.query.nom+"%"} : undefined
        }
        console.log(query);

    }
    users.findAll(query).then(res=>{
        req._users = res;
        next();
    }).catch(err=>{
       next(err);
    });
}
/**
 * affiche la liste des comments
 */
// function listComments(req,res,next){
//     let q = req.query || {};
//     comments.findAll({
//         attributes:["id","date","texte","note"],
//         include:[{
//             model:users,
//             where:{
//                 id:q.id || 1
//             }
//         }]
//     }).then(res=>{
//         req._comments = res;
//         next();
//     }).catch(err=>{
//         next(err);
//     })
// }



module.exports = {
    //administration du site
    
    listAllCommentsSwnapshot: listAllCommentsSwnapshot,

    // listAllIngredientsSnapshot: listAllIngredientsSnapshot,
    // saveOrUpdateIngredient:saveOrUpdateIngredient,
    // getIngredientDetails: getIngredientDetails,
    // deleteIngredientById: deleteIngredientById,
    // getIngredientsByType:getIngredientsByType,
    // getCategoryPizzaSNapshot : getCategoryPizzaSNapshot,


    // listAllPizzasSnapshot: listAllPizzasSnapshot,
    // saveOrUpdatePizzas: saveOrUpdatePizzas,
    // getPizzaDetails : getPizzaDetails,

    // listAllNewsSwnapshot: listAllNewsSwnapshot,
    // saveNews: saveNews,

    // listAllUsersSnapshot:listAllUsersSnapshot,
    // getUserDetails:getUserDetails,




    getpizzacount : getPizzasCount,


    listUsers: listUsers,
    listAllPizzasByCatgorie: listAllPizzasByCatgorie
}