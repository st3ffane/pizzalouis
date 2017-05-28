//les serveur socket IO
let io = require("socket.io");
let server = null;
let client_admin = null;

let db_commandes = require("./models/db.commandes");

module.exports = {
    init_server: function (app){
        server = io(app);
        server.listen(5000);//le serveur http ecoute sur le port 5000
        server.on('connection', function(client) {  
            console.log('Client connected...');
            /*if(client_admin){
                //refuse
                client.disconnect();
                return;
            }*/

        
            client.on("disconnect", ()=>{
                console.log("End connection for client...");
                client_admin = undefined;
            });
            client_admin = client;

            //emit les commandes deja enregistrées
            db_commandes.getCommandesInfosForToday().then( commandes=>{
                client.emit("hello", commandes);
            }).catch(err=>{
                client.emit("error", err);
            })

        });
    },

    newcommande: function (cmd_infos){
        //envoie un message pour indiquer une nouvelle commande!!!!
        if(!server || !client_admin) return;
        client_admin.emit("new_commande", cmd_infos);
    }
}