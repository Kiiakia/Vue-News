var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  // console.log(req.headers);
  // console.log(req.url);
  if(req.url === '/adminapi/user/login') {
    next();
    return;
  }
  const {authorization} = req.headers;

  token = authorization.split(' ')[1];

  // console.log(token);

  if(token) {
    let userData = JWT.verify(token);
    // console.log(userData);
    if(userData) {
      let newToken = JWT.generate({
        _id: userData._id,
        username: userData.username
      }, '1d');

      // console.log(newToken);
      
      res.header('Authorization', newToken);
      next();
    }else {
      res.status(401).send({
        errCode: -1,
        errMsg: 'token过期'
      });
    }
  }else {
    res.status(401).send({
      errCode: -1,
      errMsg: 'token过期'
    });
  }
})
app.use('/adminapi', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
