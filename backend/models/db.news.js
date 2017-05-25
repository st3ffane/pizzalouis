/**
 * db.news.js
 * 
 * Les middlewares pour acceder aux informations relatives
 * aux news
 */
var sequelize = require("sequelize");
var util = require('util');
var SEQ = require("./db_connect");


//les models de tables
var users = require("./users");
var comments = require("./comments");
var pizza = require("./pizzas");
var ingredients = require("./ingredients");
var category = require("./category");
var commandes = require("./commands");
var news = require("./news");
var cp = require("./commandes_pizzas");


function listAllNewsSwnapshot(req,res,next){

    //parametres de la requete 
    let orderby="date_pub DESC";//par defaut, les dernieres en premier

    SEQ.query(`select id,title,date_pub,texte,counts.count
        from news
        left outer join (
        select id_news, count(id_news) from comments_news group by(id_news)) as counts
        on id=counts.id_news
        ORDER BY ${orderby}
        ;`).then(dt=>{
    
        req._news = dt[0];
        
        next();
    }).catch(err=>next(err));
}

//pour supporter les datatables
function listAllNewsAjax(req,res,next){
    let iDisplayStart = req.query.start || 0;
    let iDisplayLength = req.query.length || 10;
    let sSearch = req.query.search.value ;
    let iSortingCols = req.query.iSortingCols || 0;
    let sEcho = req.query.sEcho;
    let order = req.query.order;
    let columns = req.query.columns;

    let totalnews = 0;
    //etc....

    news.count().then(dt=>{
        totalnews = dt;
        //parametres de la requete 
        let orderby="date_pub DESC";//par defaut, les dernieres en premier
        if(order && order.length>0){
            let who = order[0].column;
            let how = order[0].dir;

            orderby = columns[who].data+" "+how;
        }
        let strsearch = sSearch ? "WHERE title ILIKE '"+sSearch+"%' " : "";

        return SEQ.query(`select id,title,date_pub,texte, coalesce(counts.count,0) as count
            from news
            left outer join (
            select id_news, count(id_news) from comments_news group by(id_news)) as counts
            on id=counts.id_news
            ${strsearch}
            ORDER BY ${orderby}
            LIMIT ${iDisplayLength}
            OFFSET ${iDisplayStart}
            ;`);

    }).then(dt=>{
    
        req._news ={
            recordsTotal: totalnews,//totalnews, //a voir
            recordsFiltered : totalnews,
            sEcho:sEcho,

            aaData:dt[0]
        } ;
        
        next();}).catch(err=>next(err));
}


function saveNews(req,res,next){
    req.checkBody("id").optional().isInt();
    req.checkBody("title").notEmpty();//titre obligatoire
    req.checkBody('texte').notEmpty();

    
    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            //error
            
            next("Invalid datas");
            return;
        }

        //le file upload 

        console.log(req.file)
        let file = req.file? req.file.filename : null;
        let infos = {
            title: req.body.title,
            texte: req.body.texte,
            
        }
        if(file){
            console.log("SAUVEGARDE IMAGE "+file)
            infos.picture = file;
        }
        console.log("HAS ID: ",req.body.id)
        if(req.body.id){
           return  news.update(infos, {
                where:{
                    id: req.body.id
                }
            });
        }
        return news.create(infos)
    }).then(dt=>{
            req._msg="Creation de la news OK";
            next();
        }).catch(err=>next(err));;
    


}

function getNewsDetails(req,res,next){
    req.checkParams("id").isInt();
    req.getValidationResult().then(result=>{
        if(!result.isEmpty()){
            res.redirect("/admin/news");//repart a la liste 
            return;
        }
        //recup la news 
        return news.find({
            where:{
                id:req.params.id
            }
        });
    }).then( dt =>{
        req._news = dt.dataValues;
        console.log(req._news);
        next();
    })
}

//renvoie une mini de news + 
//id prev et next
function getNewsExcerpt(offset){
    if(!offset){
        offset = 0;
        count = 2;//juste 2 news
    } else {
        count = 3;//3 news max
    }
    return news.findAll({
        
        order:[['date_pub','DESC']],
        offset: offset,
        limit: count

    }).then(dt=>{
        if(!dt) return {};
        if(offset == 0)dt.unshift({dataValues:{id:null}});
        //normalement, au moin un tableau de 2 news...
        let infos = {
            last_news: dt[1].dataValues
        }
        infos.last_news.texte = infos.last_news.texte.substr(0,30);//50 premier chars only...
        return infos;
    }) ;
}
function getNewsById(id){
    return news.find({
        where:{id:id},
        include:[
            {
                model:comments,
                where:{etat:'published'},
                required: false,
                include:[
                    {model:users}
                ]
            }
        ]
    });
}
module.exports={
     listAllNewsSwnapshot: listAllNewsSwnapshot,
     listAllNewsAjax: listAllNewsAjax,
     saveNews: saveNews,
     getNewsDetails: getNewsDetails,



     getNews: getNewsExcerpt,
     getNewsById: getNewsById
}