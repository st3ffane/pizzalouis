"use strict";
/**
 * Création des relations entre les tables
 * generation des middlewares pour la recuperation des données
 * 
 */
var sequelize = require("sequelize");

var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");



//une pizza a un ingredient de base
pizza.belongsTo(ingredients,{foreignKey:"id_base", as:"base"});
//et des tops
 pizza.belongsToMany(ingredients,{through:"pizza_ingredient", foreignKey:"id_pizza"});
ingredients.belongsToMany(pizza,{through:"pizza_ingredient", foreignKey:"id_ingredient"});

// //une pizza a des commentaires
pizza.belongsToMany(comments,{through:"comments_pizzas", foreignKey:"id_pizza"});
comments.belongsToMany(pizza,{through:"comments_pizzas", foreignKey:"id_comment"});

// //une pizza a une category
// pizza.belongsTo(category,{foreignKey:"category"});
category.hasMany(pizza,{foreignKey:"category"});

// //une commande est passée par un client
users.hasMany(commandes,{foreignKey:"id_client"});

// //une commande a des pizzas
commandes.belongsToMany(pizza,{through:"commandes_pizzas", foreignKey:"id_pizza"});
pizza.belongsToMany(commandes,{through:"commandes_pizzas", foreignKey:"id_commande"});

// //les news ont des commentaires aussi 
news.belongsToMany(comments,{through:"comments_news", foreignKey:"id_news"});
comments.belongsToMany(news,{through:"comments_news", foreignKey:"id_comment"});


// //un utilisateur peut poster des commentaires
users.hasMany(comments,{foreignKey:"id_user"});



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
 * select pizzas.id,pizzas.nom,slogan,prix_small,prix_big,avg(comments.note)
from pizzas
join comments_pizzas as cp on pizzas.id=cp.id_pizza
join comments on cp.id_comment = comments.id
group by pizzas.id,pizzas.nom,slogan,prix_small,prix_big;


 "comments.comments_pizzas"."id_pizza" AS "comments.comments_pizzas.id_pizza", "comments.comments_pizzas"."id_comment" AS "comments.comments_pizzas.id_comment" 
 */
function listAllPizzasSnapshot(req,res,next){
    pizza.findAll({
        attributes:["id","nom","pizzas.slogan","prix_small","prix_big",'category','active',
            [sequelize.fn("AVG", sequelize.col("comments.note")), "note"]],
         include:[
             {
                model:ingredients,
                attributes:['nom'],
                as: "base"
            },
            {
                model:ingredients,
                attributes:['nom']
            },
            {
                model:comments,
                attributes:[]
            }
        ],
        group:["pizzas.id","pizzas.nom","pizzas.slogan","prix_small","prix_big",'category','active',
        "base.id","base.nom","ingredients.id","ingredients.nom","ingredients.pizza_ingredient.id_pizza",
        "ingredients.pizza_ingredient.id_ingredient","comments.comments_pizzas.id_pizza","comments.comments_pizzas.id_comment"]
    }).then( dt=>{
        let p = {};
        if(dt){
            p = {
                
                pizzas: dt.map(el=>{
                    let p = el.dataValues;
                    console.log(p)
                    p.ingredients = p.ingredients.map(ing=>{
                        return ing.dataValues.nom;
                    });
                    p.base = el.base.dataValues.nom;
                    return p;
                })
            }
            p.count = p.pizzas.length;
            
        } 
        
        req._pizzas = p;
        next();
    })
}
function listAllIngredientsSnapshot(req,res,next){
    ingredients.findAndCountAll({
        attributes:['id','nom','type','description','dispo'],

        include:[{
            model:pizza,
            attributes:[]
        }],
        
    }).then(dt=>{
        console.log(dt)
        req._ingredients ={
            count: dt.count,
            ingredients: dt.rows.map(el=>{
               
                return el.dataValues;
            })
        } 
        next();
    
    }).catch(err=>next(err))
}
function listAllUsersSnapshot(req,res,next){
    //findAndCountAll ne fonctionne pas avec group by!!!! Tant pis
    users.count().then( (dt)=>{
        req._users = {count:dt};
        
        return users.findAll({
            attributes:["users.id","nom","prenom","tel","mail", [sequelize.fn("COUNT", sequelize.col("commandes.id")), "commandesCount"]
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
function listComments(req,res,next){
    let q = req.query || {};
    let select = {
        where: q.id ? {id:q.id} : undefined,
        include:[{
            model:comments,
            
        }]
    };
    users.findAll(select).then(res=>{
        req._comments = res;
        next();
    }).catch(err=>{
        next(err);
    })
}


module.exports = {
    //administration du site
    listAllPizzasSnapshot: listAllPizzasSnapshot,
    listAllIngredientsSnapshot: listAllIngredientsSnapshot,
    listAllUsersSnapshot:listAllUsersSnapshot,

    getpizzacount : getPizzasCount,


    listUsers: listUsers,
    listComments: listComments,
    listAllPizzasByCatgorie: listAllPizzasByCatgorie
}