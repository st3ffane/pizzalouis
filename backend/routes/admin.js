"use strict";

/**
 * Router dedie a l'administration du site et de l'application
 * permet d'avoir un appercu sur les users et stats
 * permet de creer de nouvelles recettes, gerer les ingredients
 */
var express = require('express');
var router = express.Router();
//pour le multipart datas -file transfert
var multer  = require('multer')
var upload = multer({ dest: 'public/images/pizzas' });


var dbpizza = require("../models/db.pizzas");//middlewares pour les pizzas 
var dbing = require("../models/db.ingredients");//...
var dbnews = require("../models/db.news");
var dbUsers = require("../models/db.users");
var dbComments = require("../models/db.comments");
var dbCommandes = require("../models/db.commandes");
var dbStats = require("../models/db.stats");


var stats  = require("./stats");//router pour affichage des statistiques


/* GET page d'acceuil. */
router.get('/', dbComments.getNewCommentsCount,
    dbCommandes.getNewCommandesCount,
    dbUsers.getUsersCount,
    dbpizza.getPizzasCount,
    dbing.getIngredientsCount,
    dbStats.getBestStart,
    dbStats.getBestPizzaSells,
function(req, res, next) {
  res.render('dash',{
      title:"Pizza Louis - Administration",
      page_slogan:"Bienvenu dans votre administration de site",
      infos:[
          {
              icon:"fa-comments",
              label:"Nouveaux commentaires!",
              count:req._comments_count,
              color:"panel-primary",
              link:"/admin/comments"
          },
          {
              icon:"fa-shopping-cart",
              label:"Commandes en attentes!",
              count:req._commandes_count,
              color:"panel-green",
              link:"/admin/commandes"
          },
          {
              icon:"fa-user",
              label:"Inscripts!",
              count:req._users_count,
              color:"panel-yellow",
              link:"/admin/users"
          },
          {
              icon:"fa-book",
              label:"Recettes!",
              count:req._pizzas_count,
              color:"panel-red",
              link:"/admin/pizzas"
          },
          {
              icon:"fa-puzzle-piece",
              label:"Ingrédients!",
              count:req._ingredients_count,
              color:"panel-yellow",
               link:"/admin/ingredients"
              
          },
          {
            icon:"fa-star",
            label:"Meilleur Note "+(+req._best_star[0].avg.toLocaleString(
                                        'fr-FR', 
                                        { minimumFractionDigits: 2 }
                                    )),
            count:req._best_star[0].nom,
            color:"panel-yellow",
            link:"/admin/stats/notes?show=all"
        },
        {
            icon:"fa-trophy",
            label:"Meilleur vente "+req._best_sell[0].sum,
            count:req._best_sell[0].nom,
            color:"panel-green",
            link:"/admin/stats/pizzas"
        }
      ],
      sell_datas:req._sell_datas,//les ventes de jour par heure
      geoloc:req._geo, //les clients du jour
      comments: req._comments,//les 10 derniers commentaires

  });
});







//affiche la liste des recettes + permet d'en creer de nouvelles /////////////////////////////////////////////////////////
router.get('/pizzas',dbpizza.listAllPizzasSnapshot, function(req,res,next){
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
router.put("/pizzas",dbpizza.setPizzaActive, function(req,res,next){

    res.json({msg:req._msg});
    // res.render('pizzas',{
    //     title:'Pizza Louis - les recettes',
    //     slogan:'La liste de toutes les pizzas',
    //     addnew_label:"Créer une nouvelle recette!",
    //     view_link:"/admin/pizzas/",
    //     edit_link:"/admin/pizzaedit",
    //     count: req._pizzas.count,
    //     products: req._pizzas.pizzas,
    //     msg:req._msg
    // });


    
});
//creation d'une nouvelle recette
router.post('/pizzas',upload.single('picture'),dbpizza.saveOrUpdatePizzas, dbpizza.listAllPizzasSnapshot, function(req,res,next){
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
//formulaire de recette -nouvelle recette
router.get("/pizzaedit",dbpizza.getCategoryPizzaSNapshot, dbing.getIngredientsByType,function(req,res,next){
    res.render("forms/pizzas",{
        error_msg: req._error_msg,
        title:"Création d'une nouvelle Pizza!",
        product:{},
        category: req._category,
        ingredients:req._ingredients,
        bases: req._bases
    });
});
//modification d'une recette 
router.get("/pizzaedit/:id",dbpizza.getCategoryPizzaSNapshot,dbpizza.getPizzaDetails,dbing.getIngredientsByType,function(req,res,next){
    res.render("forms/pizzas",{
        error_msg: req._error_msg,
        title:"Modification des données d'une Pizza!",
        product:req._pizza,
        category: req._category,
        ingredients:req._ingredients,
        bases: req._bases
    });
});










//affichage de la liste des ingredients /////////////////////////////////////////////////////////////////////////////
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
router.get("/ingredients",dbing.listAllIngredientsSnapshot,renderIngredients );
//sauvegarde ou met a jour un ingredient
router.post('/ingredients',dbing.saveOrUpdateIngredient,dbing.listAllIngredientsSnapshot,renderIngredients);
router.put("/ingredients",dbing.setIngredientActive,function(req,res,next){
    res.status(200);
    res.end("");
})
router.get("/ingredients/delete/:id",dbing.deleteIngredientById,dbing.listAllIngredientsSnapshot,renderIngredients);

router.get("/ingredientedit", function(req,res,next){
    res.render("forms/ingredients",{
        error_msg: req._error_msg,
        title:"Création d'un nouvel ingrédient",
        product:{}
    });
});
router.get("/ingredientedit/:id",dbing.getIngredientDetails, function(req,res,next){
    res.render("forms/ingredients",{
        error_msg: req._error_msg,
        title:"Modification d'un ingrédient",
        product:req._ingredient
    });
});






//affiche la liste des news //////////////////////////////////////////////////////////////////////////////////////////
router.get("/news", function(req,res,next){
    res.render("news",{
        title:"Les news",
        slogan:"Les dernieres news publiées",
        addnew_label:"Créer une nouvelle news",
        view_link:"/admin/news/",
        edit_link:"/admin/newsedit",
        //products:req._news
    })
});
//creation d'une nouvelle news -avec image
router.post("/news",upload.single('picture'),dbnews.saveNews,dbnews.listAllNewsSwnapshot, function(req,res,next){
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
router.get("/newsedit/:id",dbnews.getNewsDetails,function(req,res,next){
    res.render("forms/news",{
        title:"Edition d'une News",
        product: req._news
    });//le plus simple de l'appli!!!
});
//edition/redaction d'une news
router.get("/newsedit",function(req,res,next){
    res.render("forms/news",{
        title:"Création d'une News"
    });//le plus simple de l'appli!!!
});


router.get("/news/api",dbnews.listAllNewsAjax,function(req,res,next){
    //renvoie les resultats au format JSON 
    //appel via AJAX par la datable
    res.json(req._news);
});






//affiche la liste des commentaires  ////////////////////////////////////////////////////////////////////////////////
router.get('/comments/delete/:id',function(req,res,next){
    res.json({msg:req._msg});
});


router.get("/comments/api",dbComments.listAllCommentsSwnapshot,function(req,res,next){
    res.json(req._comments);
});
//modifie le published
router.put('/comments',dbComments.publishComment,function(req,res,next){
    res.json({msg:"OK"});
});
router.get("/comments", function(req,res,next){
    res.render("comments",{
        title:"Les derniers commentaires",
        slogan:"Tenez vous informé de ce que disent vos clients!",
        from_news: req.query.from_news,
        from_pizzas: req.query.from_pizza
        
    })
});





//affiche la liste des clients /////////////////////////////////////////////////////////////////////////////////////
router.get("/users", function(req,res,next){
    res.render("users",{
        title:"Liste des utilisateurs de l'application",
        slogan:"La liste des inscripts",
        // count: req._users.count,
        //products:req._users.users
    })
});
router.get("/users/api",dbUsers.listAllUsersSnapshot, function(req,res,next){
    res.json(req._users);
});
router.get('/users/:id',dbUsers.getUserDetails,function(req,res,next){
    res.render("details/user",{
        title:"Informations client",
       user:req._user 
    });
});


//historique de commandes //////////////////////////////////////////////////////////////////////////////////////////

router.get("/commandes/api",dbCommandes.getCommandsSnapshot,function(req,res,next){
    res.json(req._commandes);
});
router.get("/commandes",function(req,res,next){
    res.render("commandes",{});
});

router.use('/stats', stats);

module.exports = router;