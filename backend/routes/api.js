var express = require('express');
var router = express.Router();
//la protection des urls
var authController = require("../strategy");



//post une demande d'authentification, recupere les params et 
//renvoie un token d'authentification
var gen = require('../token');
var db_users = require('../models/db.users');
var db_news = require("../models/db.news");
var db_comments = require("../models/db.comments");
var db_pizzas = require("../models/db.pizzas");

function genTokenForUser(req, res, next){
    
    if (!(req.body.name && req.body.password )) return res.json(403,{error:2, msg:'invalid parameters'}); //pas de reponse, ou inconnu

    //verifie si l'utilisateur existe 
    console.log(req.body.name, req.body.password)
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



var api_router = express.Router();
//les infos sur un client
api_router.get("/user", function(req,res,next){
    let id = req.user.id;//id de l'utilisateur 
    console.log(id);
    db_users.getUserInfos(id).then(dt=>{
      if(!dt) return res.json(404,{error:1,msg:"Unknown user"});
      res.json(200,{userInfos:dt});//renvoie le resultat
    }).catch(err=>{
      res.json(500,{error:2,msg:"Erreur interne!"});
    })
});


//mise a jour des infos d'un client
api_router.post("/user", function(req,res,next){
  //verif des données de formulaire
  req.checkBody('nom').notEmpty();
  req.checkBody('mail').notEmpty();
  req.checkBody('login').notEmpty();
  req.checkBody('passwrd').notEmpty();


  req.getValidationResult().then(result=>{
      if(!result.isEmpty()){
        return res.json(500, {error:1,msg:"Invalid params"});
      }
      db_users.updateUser(req.user.id,{
        nom:req.body.nom,
        prenom:req.body.prenom,
        tel: req.body.tel,
        mail: req.body.mail,
        login: req.body.login,
        passwrd: req.body.passwrd
      }).then( dt=>{
        res.json({error:0,msg:"OK"});
      }).catch(err=>{
        console.log(err);
        res.json(500,{error:2,msg:"Erreur sauvegarde de données"});
      })
  });
});

api_router.get('/lastnewsexcerpt',function(req,res,next){
   let offset = req.query.offset || 0;

    db_news.getNews(offset).then( dt=>{
      res.json(dt);//retourne un tableau, pe empty
    }).catch(err=>{
      console.log(err)
      res.json(500,{error:0,msg:"Erreur db"});
    })
})
api_router.get('/news/:id',function(req,res,next){
    req.checkParams("id").isInt();
    req.getValidationResult().then( result=>{
      if(!result.isEmpty()){
        return res.json(500,{error:1,msg:"Invalid parameter"});
      }

      //recupere la news et les comments 
      return db_news.getNewsById(req.params.id);


    }).then (dt=>{
      console.log(dt);
      if(!dt){
        return res.json(404,{error:2,msg:"Not found"});
      }
      res.json(dt);//la news
    })
})
api_router.post("/news/:id",function(req,res,next){
    //ajoutte un nouveau commentaire 
    let uid = req.user.id;
    let newsid = req.params.id;
    let msg = req.body.msg;
    if(!msg) return res.json({error:1,msg:"empty"});

    //enregistre le comment 
    db_comments.addNewsComment(uid,newsid,msg).then(dt=>{
      res.json({error:0,msg:"OK"});
    }).catch(err=>{
      res.json(500,{error:1,msg:"une couille dans le potage"});
    })
});


api_router.get("/pizzas", function(req,res,next){
  //renvoie la liste des pizzas
  db_pizzas.getPizzaList().then(dt=>{
    res.json(dt);
  }).catch(err=>{
    console.log(err);
    res.status(404);
    res.end("nope");
  })
})
router.use("/client",authController.isAuth, api_router);//routes protégées

module.exports = router;
