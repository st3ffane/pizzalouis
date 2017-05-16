var express = require('express');
var router = express.Router();

var db = require("../models/db.stats");



/* GET la page d'acceuil des stats. */
router.get('/', db.getTotalCommandesM,
                db.getBestSellsM,
                db.getBestStart,
                db.getSellDatas,
                db.getIngredientsSells,
                db.getBaseSells,
                db.getGeolocCommands,
                function(req, res, next) {
                    res.render("stats/stats", {
                        commandes_count:{
                                icon:"fa-shopping-cart",
                                label:"Commandes passées depuis l'application",
                                count:req._total_count,
                                color:"panel-primary",
                                link:"/admin/stats/ventes"
                            },
                        bestsell:{
                            icon:"fa-trophy",
                            label:"Meilleur vente "+req._best_sell[0].sum,
                            count:req._best_sell[0].nom,
                            color:"panel-green",
                            link:"/admin/stats/pizzas"
                        },
                        beststar:{
                            icon:"fa-star",
                            label:"Meilleur Note "+(+req._best_star[0].avg.toLocaleString(
                                                        'fr-FR', // use a string like 'en-US' to override browser locale
                                                        { minimumFractionDigits: 2 }
                                                    )),
                            count:req._best_star[0].nom,
                            color:"panel-yellow",
                            link:"/admin/stats/notes?show=all"
                        },
                        ingredient_sell:{
                            icon:"fa-puzzle-piece",
                                label:"Ingrédient le plus vendu",
                                count:req._ingredient_sell[0].nom,
                                color:"panel-red",
                                link:"/admin/stats/ingredients"
                        } ,
                        base_sell:{
                            icon:"fa-tag",
                                label:"Base la plus vendue",
                                count:req._base_sell[0].nom,
                                color:"panel-primary",
                                link:"/admin/stats/ingredients#bases"
                        } ,
                        sell_datas:{
                            datas:req._sell_datas
                        },
                        geoloc:req._geo


                    });
});

//les vues particulieres
router.get("/ventes",db.getSellDatas, function(req,res,next){
    res.render('details/ventes',{
        title:"Evolution des ventes",
        graph_title:req._graph_title,
        graph_value:req._graph_value,
        graph_type : req._graph_type,
        sell_datas:{
            datas:req._sell_datas
        },
    })
});
router.get("/pizzas",db.getBestSellsM, function(req,res,next){
    res.render('details/pizzas',{
        title:"Evolution des ventes par pizzas!",
        sell_datas:req._best_sell,
        totaux: req._totaux,
        graph_title:req._graph_title,
        graph_value:req._graph_value,
        graph_type : req._graph_type,
        
    })
});
router.get("/ingredients",db.getIngredientsSellsGraph, function(req,res,next){
    res.render('details/ingredients',{
        title:"Consommation des ingrédients",
        sell_datas:req._best_sell,
        totaux: req._totaux,
        graph_title:req._graph_title,
        graph_value:req._graph_value,
        graph_type : req._graph_type,
    })
});
router.get("/bases",db.getBasesSellsGraph, function(req,res,next){
    res.render('details/base',{
        title:"Consommation des ingrédients/bases",
        sell_datas:req._best_sell,
        totaux: req._totaux,
        graph_title:req._graph_title,
        graph_value:req._graph_value,
        graph_type : req._graph_type,
    })
});
router.get("/notes",db.getBestStart, function(req,res,next){
    //recupere les 3 meilleurs notes 
    let tiercet = req._best_star.sort( (a,b)=>{
        return a.avg < b.avg;
    }).slice(0,3);
    console.log(tiercet);

    res.render('details/notes',{
        title:"Les pizzas préférées de vos clients",
        beststar:{
            icon:"fa-star",
            datas : req._best_star
        },
        tiercet: tiercet
    })
});
router.get("/geo",db.getAllPizzas,db.getGeolocCommands, function(req,res,next){
    console.log("selecion: ",req._pizza_value);
    res.render('details/geo',{
        title:"Répartition géographique des commandes",
        geoloc:req._geo,
        pizzas:req._pizzas,
        graph_value:req._graph_value,
        day:req._day,
        pizza: req._pizza_value,
        weight: req._weight
    })
})
module.exports = router;
