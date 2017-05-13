
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

hbs.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    console.log("hello");
    // can use other formats like 'lll' too
    
    return moment(datetime).format(format);//"dddd DD.MM.YYYY HH:mm");
  }
  else {
    return datetime;
  }
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