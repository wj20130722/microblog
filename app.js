
/**
 * Module dependencies.
 */

var path    = require('path');
var	http    = require('http');
var express = require('express');
var config  = require('./config').config;
var app     = express();

app.locals.config = config;

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'hankewins.com'}));
app.use(express.session({
	secret: 'hankewins.com',
	//store: store,
	cookie: {maxAge: 900000}
}));

//中间件用于检查每个请求是否已登陆
app.use(function(req, res, next){
	res.locals.user = req.session.user;
	res.locals.isLogin = req.session.user ? true : false;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = '';
	if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
	next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//routes
require('./routes')(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(config.settings.port, function(){
  console.log('Express server listening on port ' + config.settings.port);
});

module.exports = app;