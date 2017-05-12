var express = require('express');
var router = express.Router();

var db=require("../models/db");


/* Juste pour pouvoir tester mes middlewares vie postman. */
router.get('/',db.listAllPizzasByCatgorie, function(req, res, next) {
    res.json({count:req._pizzas});
});

module.exports = router;
