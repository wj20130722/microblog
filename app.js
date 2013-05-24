
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	app = express();
	//SessionStore = require("session-mongoose")(express);
	//var store = new SessionStore({
	//	url: 'mongodb://localhost/session',
	//	interval: 120000
	//});

var config = require('./config');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
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

app.use(function(req, res, next){
	res.locals.user = req.session.user;
	res.locals.isLogin = req.session.user ? true : false;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = '';

	if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
	console.log(err);
	next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//controllers
require('./routes')(app);

//开启服务
(function(){
	http.createServer(app);
	app.listen(app.get('port'));
	console.log('Express server listening on port ' + app.get('port'));
})();
