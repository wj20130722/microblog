/**
 * error.js
 */

exports.notFound = function(req, res) {
	req.title = 'o(︶︿︶)o 唉！';
	req.template = '访问的页面不存在！';
	res.render('error/404', {
		content: req
	});
};

exports.serverError = function(req, res) {
	req.title = 'o(︶︿︶)o 唉！';
	req.template = '服务器开小差了，请稍后再试，或联系管理员提交BUG';
	res.render('error/500', {
		content: req
	});
};