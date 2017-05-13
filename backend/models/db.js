"use strict";
/**
 * Création des relations entre les tables
 * generation des middlewares pour la recuperation des données
 * 
 */
var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");



var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");

//defini qqs tables en plus
var pizza_ingredient = SEQ.define('pizza_ingredient',{
    id_pizza:{type:sequelize.INTEGER},//identifiant unique de la recette
    id_ingredient:{type:sequelize.INTEGER},//identifiant unique de la recette
    
    }, 
    {
        tableName: 'pizza_ingredient',
        timestamps: false
    }
);


//une pizza a un ingredient de base
pizza.belongsTo(ingredients,{foreignKey:"id_base", as:"base"});
//et des tops
pizza.belongsToMany(ingredients,{through:"pizza_ingredient", foreignKey:"id_pizza"});
ingredients.belongsToMany(pizza,{through:"pizza_ingredient", foreignKey:"id_ingredient"});

// //une pizza a des commentaires
pizza.belongsToMany(comments,{through:"comments_pizzas", foreignKey:"id_pizza"});
comments.belongsToMany(pizza,{through:"comments_pizzas", foreignKey:"id_comment"});

// //une pizza a une category
category.hasMany(pizza,{foreignKey:"id_category"});
pizza.belongsTo(category,{foreignKey:"id_category"});

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
comments.belongsTo(users,{foreignKey:"id_user"});


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
function listAllPizzasSnapshot(req,res,next){
    pizza.findAll({
        attributes:["id","nom","pizzas.slogan","prix_small","prix_big",'id_category','active',
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
        group:["pizzas.id","pizzas.nom","pizzas.slogan","prix_small","prix_big",'id_category','active',
        "base.id","base.nom","ingredients.id","ingredients.nom","ingredients.pizza_ingredient.id_pizza",
        "ingredients.pizza_ingredient.id_ingredient","comments.comments_pizzas.id_pizza","comments.comments_pizzas.id_comment"]
    }).then( dt=>{
        let p = {};
        if(dt){
            p = {
                
                pizzas: dt.map(el=>{
                    let p = el.dataValues;
                    
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
function getCategoryPizzaSNapshot(req,res,next){
    category.findAll({
        attributes:["nom"]
    }).then(dt=>{
        req._category = dt.map(el=>{
            console.log(el.dataValues)
            return el.dataValues.nom;
        });
        next();
    });

}
function saveOrUpdatePizzas(req,res,next){
    //validation des donées
    req.checkBody('id').optional().isInt();//id peut etre present, doit etre un entier (bigint)
    req.checkBody("nom").notEmpty();//titre obligatoire
    // req.checkBody("slogan").notEmpty();//titre obligatoire
    // req.checkBody("long_desc").notEmpty();//titre obligatoire
    req.checkBody("prix_small").isDecimal();
    req.checkBody("prix_big").isDecimal();
    //picture?
    //active ?
    req.checkBody("id_base").isInt();//identifiant base 
    req.checkBody("ingredients").isArrayOfId();

    req.getValidationResult().then( result=>{
        if(!result.isEmpty()){
            //erreur validation des données
            console.log("Erreur de validations");
            console.log(util.inspect(result.array()))
            req._msg = "Erreur de validations";
            //revient sur la meme page... 
            res.redirect("/admin/pizzaedit");
            return;
        }

        console.log("Trry saving datas");
        let infos = {
           
            nom: req.body.nom,
            slogan: req.body.slogan,
            long_desc: req.body.long_desc,
            prix_small: req.body.prix_small,
            prix_big: req.body.prix_big,
            active: req.body.active || false,
            picture: "test.jpg",
            id_category: req.body.id_category,
            id_base: req.body.id_base,
            

        }

        if(req.body.id){
            //mise a jour
           
            pizza.update(infos,{validate:true,where:{id:req.body.id}}).then( dt=>{
                let ings = req.body.ingredients.map(el=>{
                    return "("+req.body.id+","+el+")";
                });
                return SEQ.query("DELETE from pizza_ingredient where id_pizza="+req.body.id+"; INSERT INTO pizza_ingredient(id_pizza, id_ingredient) VALUES "+ings.join(','));

            }).then( dt=>{
                    //fin de requete????
                    req._msg = "Modification effectuées avec succès!"
                    next();
                }).catch(err=>{
                    next(err);//gros bug!
                });

        } else {
            //creation
            
            let mp = pizza.create(infos).then( dt=>{
                //les relations avec les ingredients 
                let ings = req.body.ingredients.map(el=>{
                    return "("+dt.id+","+el+")";
                });
                
                return SEQ.query("INSERT INTO pizza_ingredient(id_pizza, id_ingredient) VALUES "+ings.join(','));

            }).then( dt=>{
                    //fin de requete????
                    next();
                }).catch(err=>{
                    next(err);
                });
        }
        // pizza.upsert(infos,{
        //     validate:true,
        //     include:[{
        //         model: ingredients
        //     }]
        // }).then( dt=>{

            
        //     req._msg = "Sauvegarde des modifications OK";
        //     console.log(dt);
        //     let id = dt.dataValues.id;
        //     console.log("Identifiant de la pizza: "+id);

        //     //sauvegarde la liste des ingredients 

        //     console.log("OK");
        //     next();
        // }).catch( err =>{
        //     req._msg = "Echec lors de la modification "+err;
        //     console.log("Error: "+err);
        //     next();
        // })
        //les relations
    });
    
}

function getPizzaDetails(req,res,next){
    let id = req.params.id;
    if(!id) {
        res.redirect("/admin/pizzas");
        return;
    }
    pizza.findById(id,{
        include:[
            {
                model: ingredients,
                as:"base",
                attributes:["id","nom"]
            },
            {
            model: ingredients,
            attributes:["id","nom"]
        }]
    }).then(dt=>{
        //enregistre les données 
        let p = dt.dataValues;
        //les ingredients 
        p.base = p.base.dataValues;
        p.ingredients = p.ingredients.map(el=>{
            return el.dataValues;
        });
        req._pizza = p;
        next();
    }).catch(err=>{
        next(err);//gros bug
    })
}

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







function listAllCommentsSwnapshot(req,res,next){
    comments.findAll({
        attributes:["id","date","texte","etat"],
        include:[
            {
                model:users,
                attributes:['id','nom','prenom']
            }
        ]
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
    
    
    listAllUsersSnapshot:listAllUsersSnapshot,
    
    listAllCommentsSwnapshot: listAllCommentsSwnapshot,

    listAllIngredientsSnapshot: listAllIngredientsSnapshot,
    saveOrUpdateIngredient:saveOrUpdateIngredient,
    getIngredientDetails: getIngredientDetails,
    deleteIngredientById: deleteIngredientById,
    getIngredientsByType:getIngredientsByType,
    getCategoryPizzaSNapshot : getCategoryPizzaSNapshot,


    listAllPizzasSnapshot: listAllPizzasSnapshot,
    saveOrUpdatePizzas: saveOrUpdatePizzas,
    getPizzaDetails : getPizzaDetails,

    listAllNewsSwnapshot: listAllNewsSwnapshot,
    saveNews: saveNews,

    getpizzacount : getPizzasCount,


    listUsers: listUsers,
    listAllPizzasByCatgorie: listAllPizzasByCatgorie
}