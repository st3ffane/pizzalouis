/**
 * db.pizzas.js
 * 
 * Les middlewares pour acceder aux informations relatives
 * aux pizzas
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


//récupere la liste des pizzas dans la base (ADMIN)
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

//recupere la liste des categories de pizzas @EN ATTENTE
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

//sauvegarde les infos relatives a une pizza
function saveOrUpdatePizzas(req,res,next){
    //validation des donées
    console.log(req.body)
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
        //le file upload 
        let file = req.file? req.file.filename : null;
        
        
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

        if(file){
            infos.picture = file;//uniquement si modifié
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
        
    });
    
}

//recupere les details d'une pizza (formulaire)
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

//change l'etat d'une pizza
function setPizzaActive(req,res,next){
    req.checkBody('pizza').isInt();
    req.checkBody("active").isBoolean();

    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            // ne fait rien
            console.log(result.array())
            req._msg = "Informations invalides. Annulation";
            next();
            return;
        }
        pizza.update({active:req.body.active},{
            fields:["active"],
            where:{
                id:req.body.pizza
            }
        }).then( dt=>{
            req._msg = "Activation OK";
            next();
        }).catch(err=>next(err));
    });
}


module.exports = {

    listAllPizzasSnapshot: listAllPizzasSnapshot,
    saveOrUpdatePizzas: saveOrUpdatePizzas,
    getPizzaDetails : getPizzaDetails,
    getCategoryPizzaSNapshot : getCategoryPizzaSNapshot,
    setPizzaActive:setPizzaActive
}