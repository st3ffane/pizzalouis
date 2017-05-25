var passeport = require('passport');
//var basic = require("passport-http");
var token = require("passport-token-auth");
var jwt = require("jwt-simple");
var gen = require("./token");



//verifie si a un token, si oui, ok, si non, degage
function process_auth(token, cb){

     if(token){
        
        try{
            var decoded = jwt.decode(token, require("../config/secret")());
            
            if(decoded.exp <= Date.now()){
                //token expires, redirect to loggin                
                return cb(null, false);//mettre des infos ici...

            }
            
            //token valide, passe au reste???
            var duser = decoded.user;
            
            // verifie si l'utilisateur peut se connecter
            //les données importantes (role, ...) sont dans le credentials
            return cb(null, duser);
            

        } catch(err){
            return cb(err, false);//mettre des infos ici...
        }
    }
    return cb(err, false);//redirect vers loggin???
}


passeport.use(new token.Strategy({},process_auth));
exports.isAuth = passeport.authenticate('token',{session:false});