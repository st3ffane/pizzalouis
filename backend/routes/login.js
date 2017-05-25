var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//création d'un nouvel utilisateur
router.post("/", function(req,res,next){
  //tout est ok, le user a été crée
})
module.exports = router;
