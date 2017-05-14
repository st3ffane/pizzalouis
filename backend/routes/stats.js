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
                            link:"/admin/stats/notes"
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
        datas:{

        }
    })
});
router.get("/pizzas",db.getBestSellsM, function(req,res,next){
    res.render('details/pizzas',{
        title:"Evolution des ventes par pizzas!",
        datas:{
            
        }
    })
});
router.get("/ingredients",db.getIngredientsSells, db.getBaseSells, function(req,res,next){
    res.render('details/ingredients',{
        title:"Consommation des ingrédients/bases",
        datas:{
            
        }
    })
});
router.get("/notes",db.getBestStart, function(req,res,next){
    res.render('details/notes',{
        title:"Les pizzas préférées de vos clients",
        datas:{
            
        }
    })
});
router.get("/geo",db.getGeolocCommands, function(req,res,next){
    res.render('details/geo',{
        title:"Répartition géographique des commandes",
        datas:{
            
        }
    })
})
module.exports = router;
