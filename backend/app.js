var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
var session = require("express-session");

var io_server = require("./ioapp");


//crée les relations entre les tables de la base 
require("./models/relations");

//importe les différentes routes de l'appli
var admin = require("./routes/admin");
var api = require('./routes/api');
var login = require('./routes/login');

//debug only /////////////////////////
var test = require("./routes/test");
//debug only /////////////////////////

//la protection des urls
var authController = require("./strategy");



var app = express();
io_server.init_server(require('http').createServer(app));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require("./hbs.init");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//ajoute le validator pour les parametres, query & body 
//pour s'assurer que les données envoyées soient cohérentes
//rajoutte des validateurs pour certains cas
app.use(expressValidator({
  customValidators: {
    //verifie si est un tableau
     isArray: function(value) {
        return Array.isArray(value);
     },
     //un tableau non vide
     notEmpty: function(array) {
        return array.length > 0;
     },
     //verifie qu'est un tableau d'ID
     isArrayOfId: function(value) {
       
        if(!Array.isArray(value)) return false;
        if(value.length == 0) return false;
        for(let v of value){
          if(!Number.isInteger(+v)) return false;
        }
        return true;
     },
     //verifie que la valeur est une de celles acceptables
     isCommentWaiting: function(value){
        return value == "all";//unquement ceux en attente par defaut
     }
  }
})); 

app.use(cookieParser());
app.use(session({secret: "password"}));
app.use(express.static(path.join(__dirname, 'public')));





//mes end points pour les services rest 
//api/public   api/barista  api/scoot  api/admin
app.all('/api/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
app.use('/api', api);//les api rest pour l'application mobile


//la protection des urls
var jwt = require("jwt-simple");
function isadmin(req,res,next){
  //verifie le cookie si contient le token, sinon, degage
  
  let token = req.session.token;
  
  if(!token) {
     return res.redirect("/");
  }
  console.log("token: ",token);
  var decoded = jwt.decode(token.token, gen.secret);
            
  if(decoded.exp <= Date.now()){
      //token expires, redirect to loggin                
      return cb(null, false);//mettre des infos ici...

  }
  
  //token valide, passe au reste???
  var duser = decoded.user;
  console.log(duser);
  if(duser && duser.role==1) next();
  else{
    console.log("not admin")
    return res.redirect("/");
  }
};


app.use("/admin",isadmin, admin);//administration du site
app.get('/', function(req,res,next){
  res.render("login",{
    nomenu:true
  });
});

var db_user = require("./models/db.users");
var gen = require("./token");
//verifie si tout est OK et genere un token pour l'utilisateur
function genTokenForUser(req, res, next){
    
    if (!(req.body.username && req.body.password )) return res.json(403,{error:2, msg:'invalid parameters'}); //pas de reponse, ou inconnu

    //verifie si l'utilisateur existe 
    console.log(req.body.username, req.body.password)
    db_user.authUser(req.body.username ,req.body.password).then( dt=>{
        if (!dt){
          res.redirect("/");
          return;
        }
        
        //genere un token 
        //cree un token et balance a l'utilisateur
        var token = gen.genToken(dt[0]);
        //req.token=token.token;
       //sauvegarde dans un cookie?
       req.session.token=token;
        next();//probleme, enregistre le token comment????



    }).catch(err=>{
      console.log(err);
      res.redirect("/");
    })
    
}
app.post('/',genTokenForUser,
  function(req, res) {
    console.log("next ici...");
    res.redirect('/admin');
  });

//debug only  //////////////////////
app.use("/test",test);
//debug only ///////////////////////




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
