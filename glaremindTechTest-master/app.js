var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotgit = require('dotgitignore')();

const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
var cookieParser = require('cookie-parser')
var nodemailer = require('nodemailer');
const { flash } = require('express-flash-message');
var methodOverride = require('method-override')
const MongoStore = require('connect-mongo');
var expressLayouts = require('express-ejs-layouts');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// require dot-env
  require('dotenv').config();


  // set up auth
app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
  secret: process.env.SESSION_SECRETE,
  resave: false,
  store: MongoStore.create({ mongoUrl:process.env.DBURL, collectionName: 'sessionStore',
   useUnifiedTopology: true  }, (err, suc)=>{
   if(err){console.log(err)}
   if(suc){
     console.log("db SUCESSFULLY CONNECTED")
   }
  }),
  saveUninitialized:true  ,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 7 }
}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// using routes
app.use('/', routes);


mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
  //useCreateIndex: true
},  (err, suc)=>{
  if(err){console.log(err)}
  if(suc){
    console.log("db SUCESSFULLY CONNECTED")
  }
  });

  var port = process.env.PORT || '8000';
app.set('port', port);

app.listen(port, ()=>{
  console.log("App is listening at " + port);
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
