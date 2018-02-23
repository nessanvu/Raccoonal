
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var home = require('./routes/home');
var calendar = require('./routes/calendar');
var book = require('./routes/book');
var setting = require('./routes/setting');
var login = require('./routes/login');
var tutorial = require('./routes/tutorial');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/home.handlebars', home.view);
app.get('/calendar.handlebars', calendar.view);
app.get('/book.handlebars', book.view);
app.get('/setting.handlebars', setting.view);
app.get('/tutorial.handlebars', tutorial.view);
// Example route
// app.get('/users', user.list);

app.post('/', home.parseJson);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
