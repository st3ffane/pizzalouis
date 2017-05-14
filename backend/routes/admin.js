"use strict";

/**
 * Router dedie a l'administration du site et de l'application
 * permet d'avoir un appercu sur les users et stats
 * permet de creer de nouvelles recettes, gerer les ingredients
 */
var express = require('express');
var router = express.Router();


var db = require("../models/db");//les acces a la base de données
var stats  = require("./stats");//router pour affichage des statistiques


/* GET page d'acceuil. */
router.get('/', function(req, res, next) {
  res.render('dash',{
      title:"Pizza Louis - Administration",
      page_slogan:"Bienvenu dans votre administration de site",
      infos:[
          {
              icon:"fa-comments",
              label:"Nouveaux commentaires!",
              count:34,
              color:"panel-primary"
          },
          {
              icon:"fa-shopping-cart",
              label:"Commandes en attentes!",
              count:34,
              color:"panel-green"
          },
          {
              icon:"fa-user",
              label:"Inscripts!",
              count:12,
              color:"panel-yellow"
          },
          {
              icon:"fa-book",
              label:"Recettes!",
              count:34,
              color:"panel-red"
          },
          {
              icon:"fa-puzzle-piece",
              label:"Ingrédients!",
              count:34,
              color:"panel-primary"
          },
      ]
  });
});

//affiche la liste des recettes + permet d'en creer de nouvelles
router.get('/pizzas',db.listAllPizzasSnapshot, function(req,res,next){
    res.render('pizzas',{
        title:'Pizza Louis - les recettes',
        slogan:'La liste de toutes les pizzas',
        addnew_label:"Créer une nouvelle recette!",
        view_link:"/admin/pizzas/",
        edit_link:"/admin/pizzaedit",
        count: req._pizzas.count,
        products: req._pizzas.pizzas
    });


    
});
router.post('/pizzas',db.saveOrUpdatePizzas, db.listAllPizzasSnapshot, function(req,res,next){
    res.render('pizzas',{
        title:'Pizza Louis - les recettes',
        slogan:'La liste de toutes les pizzas',
        addnew_label:"Créer une nouvelle recette!",
        view_link:"/admin/pizzas/",
        edit_link:"/admin/pizzaedit",
        count: req._pizzas.count,
        msg:req._msg,
        products: req._pizzas.pizzas
    });


    
});
router.get("/pizzaedit",db.getCategoryPizzaSNapshot, db.getIngredientsByType,function(req,res,next){
    res.render("forms/pizzas",{
        error_msg: req._error_msg,
        title:"Création d'une nouvelle Pizza!",
        product:{},
        category: req._category,
        ingredients:req._ingredients,
        bases: req._bases
    });
});
router.get("/pizzaedit/:id",db.getCategoryPizzaSNapshot,db.getPizzaDetails,db.getIngredientsByType,function(req,res,next){
    res.render("forms/pizzas",{
        error_msg: req._error_msg,
        title:"Création d'une nouvelle Pizza!",
        product:req._pizza,
        category: req._category,
        ingredients:req._ingredients,
        bases: req._bases
    });
});

//affichage de la liste des ingredients 
function renderIngredients(req,res,next){
    res.render("ingredients",{
        title:"Liste des ingredients",
        slogan:"Tous les ingredients pour les pizzas",
        addnew_label:"Ajoutter un nouvel ingredient",
        view_link:"/admin/ingredients/",
        edit_link:"/admin/ingredientedit",
        count: req._ingredients.count,
        msg: req._msg,
        products:req._ingredients.ingredients
    });
}
//liste les ingredients 
router.get("/ingredients",db.listAllIngredientsSnapshot,renderIngredients );
//sauvegarde ou met a jour un ingredient
router.post('/ingredients',db.saveOrUpdateIngredient,db.listAllIngredientsSnapshot,renderIngredients);

router.get("/ingredients/delete/:id",db.deleteIngredientById,db.listAllIngredientsSnapshot,renderIngredients);



router.get("/ingredientedit", function(req,res,next){
    res.render("forms/ingredients",{
        error_msg: req._error_msg,
        title:"Création d'un nouvel ingrédient",
        product:{}
    });
});
router.get("/ingredientedit/:id",db.getIngredientDetails, function(req,res,next){
    res.render("forms/ingredients",{
        error_msg: req._error_msg,
        title:"Modification d'un ingrédient",
        product:req._ingredient
    });
});






//affiche la liste des news
router.get("/news",db.listAllNewsSwnapshot, function(req,res,next){
    res.render("news",{
        title:"Les news",
        slogan:"Les dernieres news publiées",
        addnew_label:"Créer une nouvelle news",
        view_link:"/admin/news/",
        edit_link:"/admin/newsedit",
        products:req._news
    })
});
//creation d'une nouvelle news
router.post("/news",db.saveNews,db.listAllNewsSwnapshot, function(req,res,next){
    res.render("news",{
        title:"Les news",
        slogan:"Les dernieres news publiées",
        addnew_label:"Créer une nouvelle news",
        view_link:"/admin/news/",
        edit_link:"/admin/newsedit",
        products:req._news,
        msg:req._msg
    })
});
//edition/redaction d'une news
router.get("/newsedit",function(req,res,next){
    res.render("forms/news",{
        title:"Création d'une News"
    });//le plus simple de l'appli!!!
});


//affiche la liste des commentaires 
router.get("/comments",db.listAllCommentsSwnapshot, function(req,res,next){
    res.render("comments",{
        title:"Les derniers commentaires",
        slogan:"Tenez vous informé de ce que disent vos clients!",
        products:req._comments
    })
});
//affiche la liste des clients
router.get("/users",db.listAllUsersSnapshot, function(req,res,next){
    res.render("users",{
        title:"Liste des utilisateurs de l'application",
        slogan:"La liste des inscripts",
        count: req._users.count,
        products:req._users.users
    })
});
router.get('/users/:id',db.getUserDetails,function(req,res,next){
    res.render("details/user",{
        title:"Informations client",
       user:req._user 
    });
});

router.use('/stats', stats);

module.exports = router;