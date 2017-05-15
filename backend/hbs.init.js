"use strict";


var hbs = require("hbs");
var moment = require("moment");


hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('isTop', function(v1, options) {
  
  if(v1 === true) {
    return options.fn(this);
  }
  return options.inverse(this);
});


hbs.registerHelper('linearizeArray', function(v, options) {
 
  if(v && v.length) {
     let t=v.join(",");
    return options.fn(t);
  }
  return options.inverse(this);
});


const DAYS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Venderdi','Samedi'];
const MONTH = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
hbs.registerHelper("formatDate", function(datetime, format) {
  
    // can use other formats like 'lll' too
    switch(format){
      case 'DATE':{
        format = "DD:MM:YYYY";break;
      }
      case 'DAY':{
        return DAYS[datetime];//nom du jour

      }
      case 'MONTH':{
        let m =  moment(datetime).month();//"dddd DD.MM.YYYY HH:mm");
        return moment.monthsShort(m);
      }
      case 'HOUR':{
        return (+datetime).toLocaleString("fr-FR",{minimumIntegerDigits:2})+"H";
      }
      default:break;
    }
    return moment(datetime).format(format);//"dddd DD.MM.YYYY HH:mm");
 
});

hbs.registerHelper("formatNumber",function(num,options){
  return (+num).toLocaleString('fr-FR',{
    minimumIntegerDigits: 1,
    maximumFractionDigits: 2
  })
});


hbs.registerHelper('ifEq', function(v1, v2, options) {
 
  
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('ifSupp', function(v1, v2, options) {
  
  if(+v1 >= +v2) {
    
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('add', function (current, numb,options){
  return options.fn(+current+ +numb) ;
});

hbs.registerHelper('ifEmptyList', function (list,options){
  return (list == undefined || list.length===undefined || list.length==0) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('ifIn', function(elem, list, options) {
 
  if(list){
    for(var l of list){
      if(""+l.id == ""+elem){
        
        return options.fn(this);
      }
    }
  }
  
  return options.inverse(this);
});