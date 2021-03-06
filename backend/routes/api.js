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
var db_commandes = require("../models/db.commandes");



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
        var token = gen.genToken(dt[0]);
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
//recuper les news -vues
api_router.get('/lastnewsexcerpt',function(req,res,next){
   let offset = req.query.offset || 0;

    db_news.getNews(offset).then( dt=>{
      res.json(dt);//retourne un tableau, pe empty
    }).catch(err=>{
      console.log(err)
      res.json(500,{error:0,msg:"Erreur db"});
    })
})
//recupere une news -details
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
//post un comment sur une news
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

//details sur une pizza
api_router.get("/pizzas/:id", function(req,res,next){
  db_pizzas.getPizzaById(req.params.id).then(dt=>{
      res.json(dt);
    }).catch(err=>{
      console.log(err);
      res.status(500);
      res.json({error:1,msg:"Erreur db"});
    })
})
//post un comment pour une pizza
api_router.post("/pizzas/:id", function(req,res,next){
    //enregistre un nouveau message pour une pizza!!!
    let uid = req.user.id;
    let newsid = req.params.id;
    let msg = req.body.msg;
    let note = req.body.note || 4;

    if(!msg) return res.json({error:1,msg:"empty"});

    //enregistre le comment 
    db_comments.addPizzaComment(uid,newsid,msg, note).then(dt=>{
      res.json({error:0,msg:"OK"});
    }).catch(err=>{
      res.json(500,{error:1,msg:"une couille dans le potage"});
    })
})
//liste des pizzas
api_router.get("/pizzas", function(req,res,next){
  //renvoie la liste des pizzas
  db_pizzas.getPizzaList().then(dt=>{
    res.json(dt);
  }).catch(err=>{
    console.log(err);
    res.status(404);
    res.end("nope");
  })
});


//Paiement via paypal!!!
/*var braintree = require("braintree");
const MerchantId = "x4g5njd8f7mf456s";
const publickey = "ks4pzd66qsdpxjwg";
const privatekey = "d26e1166f42ccbb00607ffd7e528c0b3";


//pour la sandbox
const cardnumber = "4111111111111111";
const nonces = "fake-valid-nonce";

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: MerchantId,
  publicKey: publickey,
  privateKey: privatekey
});*/
var gateway = require("../middlewares/braintree.pizza.js");
//genere un token de paiement pour le client
api_router.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    if(err){
      console.log(err)
      res.end(""+err);
      return;
    }
    res.json({token:response.clientToken});
  });
});



var io = require("../ioapp");
const nonces = "fake-valid-nonce";
api_router.post("/commande", function (req, res) {
  //recup infos de la commande et valide.....
 

   //la commande
    let card = req.body;
   db_commandes.getCommandeTotalAmount(card.pizzas).then(amount=>{
      //le mode de paiement
     
      var nonceFromTheClient = nonces;//pour le sandbox, sinon: req.body.payment_method_nonce;

      //demande le paiement
      gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        //retour de paypal, verifie si le paiemennt a ete accepté

        if(err){
          res.status(500);
          return res.json({error:2,msg:"Paiement refusé"});
        }

        if(!result.success){
          //echec de la transaction
          res.status(500);
          return res.json({error:2,msg:"Echec de la transaction"});         
        }

        //sauvegarde la commande
        db_commandes.saveCommande(req.user.id, card, result.transaction.id, amount).then( success=>{          
            //envoie un mail de confirmation

            //previens socketIO
            //'${card.retrait}','${transaction}','${card.message}',${from},'(${card.location.latitude},${card.location.longitude})',${amount}

            let pizzas = [];
            for (let p of card.pizzas){
              pizzas.push({
                  size: p.big ? true : false,
                  qtte: p.big || p.small,
                  pizza: p.nom
                });
            }
            //envoie le message
            io.alertNewCommand({
              date_cmd: new Date(),
              date_retrait: card.retrait,
              client:{
                prenom: req.user.prenom,
                nom:req.user.nom
              },
              message: card.message,
              pizzas:pizzas,
              payement_id: result.transaction.id,
              prix: amount
            });
            //renvoie OK
            res.json({error:0, msg:"Success"});
        })
        .catch (err=>{
          console.log(err);
              res.status(500);
              return res.json({error:2,msg:err});
        });
        
        
      });


    }).catch (err=>{
      console.log(err);
          res.status(500);
          return res.json({error:3,msg:err});
    })

  });
  

router.use("/client",authController.isAuth, api_router);//routes protégées

module.exports = router;
