//Paiement via paypal!!!
var braintree = require("braintree");
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
});


module.exports= gateway;