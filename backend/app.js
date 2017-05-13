var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')





var admin = require("./routes/admin");
var api = require('./routes/api');
var login = require('./routes/login');

//debug only /////////////////////////
var test = require("./routes/test");
//debug only /////////////////////////



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require("./hbs.init");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({
  customValidators: {
     isArray: function(value) {
        return Array.isArray(value);
     },
     notEmpty: function(array) {
        return array.length > 0;
     },
     isArrayOfId: function(value) {
       
        if(!Array.isArray(value)) return false;
        if(value.length == 0) return false;
        for(let v of value){
          if(!Number.isInteger(+v)) return false;
        }
        return true;
     }
  }
})); // this line must be immediately after any of the bodyParser middlewares!

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);//par defaut, arrive sur une page d'authentification
app.use('/api', api);//les api rest pour l'application mobile
app.use("/admin", admin);//administration du site

//debug only  //////////////////////
app.use("/test",test);
//debug only ///////////////////////




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
