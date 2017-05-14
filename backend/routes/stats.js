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
                                color:"panel-primary"
                            },
                        bestsell:{
                            icon:"fa-trophy",
                            label:"Meilleur vente "+req._best_sell[0].sum,
                            count:req._best_sell[0].nom,
                            color:"panel-green"
                        },
                        beststar:{
                            icon:"fa-star",
                            label:"Meilleur Note "+(+req._best_star[0].avg.toLocaleString(
                                                        'fr-FR', // use a string like 'en-US' to override browser locale
                                                        { minimumFractionDigits: 2 }
                                                    )),
                            count:req._best_star[0].nom,
                            color:"panel-yellow"
                        },
                        ingredient_sell:{
                            icon:"fa-puzzle-piece",
                                label:"Ingrédient le plus vendu",
                                count:req._ingredient_sell[0].nom,
                                color:"panel-red"
                        } ,
                        base_sell:{
                            icon:"fa-tag",
                                label:"Base la plus vendue",
                                count:req._base_sell[0].nom,
                                color:"panel-primary"
                        } ,
                        sell_datas:{
                            datas:req._sell_datas
                        },
                        geoloc:req._geo


                    });
});

module.exports = router;
