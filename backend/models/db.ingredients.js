/**
 * db.ingredients.js
 * 
 * Les middlewares pour acceder aux informations relatives
 * aux ingrédients
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


//les ingredients CRUD 
function listAllIngredientsSnapshot(req,res,next){
    ingredients.findAndCountAll({
        attributes:['id','nom','type','description','dispo'],

      
        
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
function setIngredientActive(req,res,next){
    req.checkBody('ingredient').isInt();
    req.checkBody('active').isBoolean();
    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            res.status(400);
            res.end(""+util.format(result.array()));
            return;
        }
        return ingredients.update({
            dispo:req.body.active
        },{
            where:{
                id:req.body.ingredient
            }
        });
    }).then( dt=>{
        next();
    }).catch(err=>{
        res.status(400);
        res.end(""+err);
    })
}


module.exports = {
    listAllIngredientsSnapshot: listAllIngredientsSnapshot,
    saveOrUpdateIngredient:saveOrUpdateIngredient,
    getIngredientDetails: getIngredientDetails,
    deleteIngredientById: deleteIngredientById,
    getIngredientsByType:getIngredientsByType,
    setIngredientActive: setIngredientActive
}