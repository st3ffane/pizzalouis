
var hbs = require("hbs");
hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('isTop', function(v1, options) {
  
  if(v1 === true) {
    return options.fn(this);
  }
  return options.inverse(this);
});







hbs.registerHelper('ifEq', function(v1, v2, options) {
  console.log("ici")
  console.log(v1,v2)
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('ifSupp', function(v1, v2, options) {
  
  if(+v1 >= +v2) {
    console.log("Supp")
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
      
      if(""+l._id == ""+elem){
        
        return options.fn(this);
      }
    }
  }
  
  return options.inverse(this);
});