
//renvoie un token pour l'authentification des clients 
var secret = 'super.super.secret.shhh';
var jwt = require("jwt-simple");
/*
Genere un token pour un utilisateur
*/
var genToken = function(user){

  user = user[0];
  var expires = expiresIn(1);//1 jour de validité
  var token = jwt.encode({
    exp: expires,
    user: user
  }, secret);

  return {
    token: token,
    expires: expires,
    user: {
        name: user.nom,
        prenom: user.prenom,
        role:user.role
    }
  }
}
//renvoie la date + 1 jour pour la validité
function expiresIn(numDays){
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = {
    genToken: genToken,
    secret:secret
}