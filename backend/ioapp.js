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
            if(client_admin){
                //refuse
                client.disconnect();
                return;
            }

        
            client.on("disconnect", ()=>{
                console.log("End connection for client...");
                client_admin = null;
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

    alertNewCommand: function (cmd_infos){
        if(server && client_admin){
            client_admin.emit('new_commande', cmd_infos);
        }
    }
    
}