const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const fs           = require('fs');
const serveStatic  = require('serve-static');

const config = require('./config');
const routes = require('./routes/index');
const users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(logger(config.format(), {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public'),{
    maxAge: '1d',
    setHeaders: setCustomCacheControl
}));

function setCustomCacheControl (res, path) {
    if (serveStatic.mime.lookup(path) === 'text/html') {
        // Custom Cache-Control for HTML files
        res.setHeader('Cache-Control', 'public, max-age=0')
    }
}

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException: %s', err.stack);
});

module.exports = app;
