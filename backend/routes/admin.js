"use strict";

/**
 * Router dedie a l'administration du site et de l'application
 * permet d'avoir un appercu sur les users et stats
 * permet de creer de nouvelles recettes, gerer les ingredients
 */
var express = require('express');
var router = express.Router();


var db = require("../models/db");//les acces a la base de données



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

//affichage de la liste des ingredients 
router.get("/ingredients",db.listAllIngredientsSnapshot, function(req,res,next){
    res.render("ingredients",{
        title:"Liste des ingredients",
        slogan:"Tous les ingredients pour les pizzas",
        addnew_label:"Ajoutter un nouvel ingredient",
        view_link:"/admin/ingredients/",
        edit_link:"/admin/ingredientedit",
        count: req._ingredients.count,
        products:req._ingredients.ingredients
    });
    console.log(req._ingredients.ingredients)
});

//affiche la liste des news
router.get("/news", function(req,res,next){
    res.render("pizzas",{
        title:"Les news",
        slogan:"Les dernieres news publiées",
        addnew_label:"Créer une nouvelle news",
        view_link:"/admin/news/",
        edit_link:"/admin/newsedit",
        products:[
            {
                id:"anid",
                nom:"un nom",
                long_desc:"Une longue description",
                dispo: true,
                top:true,
                picture:"test.jpg"
            },
            {
                id:"anid",
                nom:"un nom",
                long_desc:"Une longue description",
                dispo: false,
                top:false,
                picture:"test.jpg"
            },
        ]
    })
});
//affiche la liste des commentaires 
router.get("/comments", function(req,res,next){
    res.render("pizzas",{
        title:"Les derniers commentaires",
        slogan:"Tenez vous informé de ce que disent vos clients!",
        products:[
            {
                id:"anid",
                nom:"un nom",
                long_desc:"Une longue description",
                dispo: true,
                top:true,
                picture:"test.jpg"
            },
            {
                id:"anid",
                nom:"un nom",
                long_desc:"Une longue description",
                dispo: false,
                top:false,
                picture:"test.jpg"
            },
        ]
    })
});
//affiche la liste des clients
router.get("/clients",db.listAllUsersSnapshot, function(req,res,next){
    res.render("users",{
        title:"Liste des utilisateurs de l'application",
        slogan:"La liste des inscripts",
        count: req._users.count,
        products:req._users.users
    })
});

//affichage des infos sur une pizza en particulier
router.get('/pizzas/:id', function(req,res,next){

});
module.exports = router;