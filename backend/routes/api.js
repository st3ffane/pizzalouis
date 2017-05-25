var express = require('express');
var router = express.Router();
//la protection des urls
var authController = require("../strategy");



//post une demande d'authentification, recupere les params et 
//renvoie un token d'authentification
var gen = require('../token');
var db_users = require('../models/db.users');

function genTokenForUser(req, res, next){
    
    if (!(req.body.name && req.body.password )) return res.json(403,{error:2, msg:'invalid parameters'}); //pas de reponse, ou inconnu

    //verifie si l'utilisateur existe 
    db_users.authUser(req.body.name ,req.body.password).then( dt=>{
        if (!dt){
          res.json(403,{error:1,msg:"Unknown"});
          return;
        }

        //genere un token 
        //cree un token et balance a l'utilisateur
        var token = gen.genToken(dt);
        res.send(200,{error:0,token:token});



    }).catch(err=>{
      console.log(err);
      res.json(403,{error:2, msg:'Error'});
    })
    
}
router.post("/login",genTokenForUser );
//creation d'un nouvel utilisateur + log dans la foulée
router.post('/createuser',function(req,res,next){
  if (!(req.body.name && req.body.password )) return res.json(403,{error:2, msg:'invalid parameters'}); //pas de reponse, ou inconnu
  db_users.createUser(req.body.name, req.body.password).then(dt=>{
      //ok
      next();
  }).catch(err=>{
      return res.json(500,{error:1,msg:err});
  })
}, genTokenForUser);

//autres routes avec protection
//app.use('/app',authController.isAuth, api);//les api rest pour l'application mobile



module.exports = router;
