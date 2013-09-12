
var User = require('../models/users');

var crypto = require('crypto'); //node核心加载模块
var config = require('../config').config;

//var mail = require('../services/mail');

/**
 * show user login page.
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
exports.showLogin = function(req, res) {
	console.log("host:" + req.host);
	req.session._loginReferer = req.headers.referer;
	res.render('login', {title:'用户登陆', curNav: 'login'});
};

exports.doLogin = function(req, res) {
	var md5 = crypto.createHash('md5');
	var username = req.body.username;
	var password = md5.update(req.body.password).digest('hex');

	console.log(password);

	if (username == '' || password == '') {
		req.session.error = "用户名和密码不正确";
		return res.redirect('/login');
	}

	User.get(username, function(err, user){
		if (!user) {
			req.session.error = "用户不存在或密码错误";
			return res.redirect('/login');
		}

		//检查密码是否一致
		if (user.password != password) {
			req.session.error = "用户不存在或密码错误";
			return res.redirect('/login');
		}

		//用户名密码都匹配后，将用户信息存入 session
		req.session.user = user;
		res.redirect('/');
	});
};

exports.logout = function(req, res) {
	req.session.user = null;
	res.redirect('/');
};

exports.register = function(req, res) {
	res.render('register', {title:'用户注册', curNav: 'register'});
};

exports.doRegister = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var password_rep = req.body['password-repeat'];


	if(username == '') {
		req.session.error = '用户名不能为空';
		return res.redirect('/register');
	}

	if (password == '') {
		req.session.error = '密码不能为空';
		return res.redirect('/register');

	} else if (password_rep != password) {
		req.session.error = '两次输入的口令不一致'; 
		return res.redirect('/register');
	}

	password = md5(req.body.password);

	var newUser = new User({
		name: username,
		password: password,
		email: email
	});
	//检查用户名是否存在
	User.get(newUser.name, function(err, user){
		if (user) {
			err = '用户已存在';
		}

		if (err) {
			req.session.error = err;
			return res.redirect('/register');
		}

		//如果不存在则新增用户
		newUser.save(function(err){
			if(err) {
				req.session.error = err;
				return res.redirect('/register');
			}
		});

		req.session.user = newUser;
		req.session.error = '注册成功';
		res.redirect('/');
	});
};

function md5(str) {
	var md5 = crypto.createHash('md5');
	md5.update(str);
	str = md5.digest('hex');
	return str;
}