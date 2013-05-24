/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Microblog', curNav: 'home'});
};

exports.home = function(req, res){
  res.render('home', { title: 'Home', curNav: 'home' });
};