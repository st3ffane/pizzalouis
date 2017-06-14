# pizzalouis
Projet de fin de formation GRETA Dax

# Database
Cette application utilise une base PosstgresSQL pour le stockage des données
Dump de la base: docs/pizza-dump.sql
nom: pizzas
owner: louis
passwrd: admin

(creation des tables et de quelques enregistrements par défaut)

***La base doit avoir l'extension pgcrypto d'installée et de créée***

# Backend
Le serveur express contenant l'administration et les services REST nécessaires a l'application
* /admin: point d'entrée vers l'admin (login:pizzaiolo, pass:admin:)

# designs et docs
quelques recherche graphique et les dossiers de fin de stage pour le GRETA

# Pizza
Application angular (v4)
* lancer le server express (localhost:3000)
`npm start`
* lancer le serveur de dev angular 
`ng serve --proxy proxy.json` ou `npm start`
* lancer le navigateur web (par exemple chromium) a la page http://localhost:3000/
* page de login, renseigner un login/mot de passe (par exemple: steff steff)
en théorie, tout marche!

# PizzaLouis
Application NativeScript (Android Only pour l'instant)
Pour tester l'appli (juste une note pour pas oublier le process!), l'ordinateur lancant le serveur express ET le téléphone doivent etre sur le même réseau WIFI:
* lancer le server express (localhost:3000)
`npm start`
* connecter le smartphone au même réseau WIFI
* lancer l'application ou le serveur de dev (après avoir connecter le téléphone via USB)
`tns run android`
* page de login, renseigner l'IP du serveur (`ip addr`)
en théorie, tout marche!

*A tester avec un réseau crée par le téléphone lui même...*
