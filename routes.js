/**
 * routes.js
 */
var index = require('./routes/index'),
	users = require('./routes/users'),
	error = require('./routes/error'),
	login = require('./routes/login');

module.exports = function(app) {
	function authentication(req, res, next) {
		if (!req.session.user) {
			req.session.error = '请先登陆';
			return res.redirect('/login');
		}
		next();
	}

	function notAuthentication(req, res, next) {
		if(req.session.user) {
			req.session.error = '已登陆';
			return res.redirect('/');
		}
		next();
	}

	app.get('/', index.index);

	app.all('/login', notAuthentication);
	app.get('/login', login.showLogin);
	app.post('/login',login.doLogin);

	app.get('/logout', authentication);
	app.get('/logout', login.logout);

	app.get('/home', authentication);
	app.get('/home', index.home);

	app.get('/register', login.register);
	app.post('/register', login.doRegister);

	//app.post('login', login.doLogin);
	//app.get('/users', users.list);
	//app.get('/404', error.notFound);
	//app.get('/500', error.serverError);
	//app.get('*', error.notFound);
}