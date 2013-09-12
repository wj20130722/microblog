/**
 * users.js for model
 */

var db = require('./db');

function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email
	};

	//打开数据库
	db.open(function(err, db){
		if (err) {
			return callback(err);
		}

		db.collection('users', function(err, collection){
			if (err) {
				db.close();
				return callback(err);
			}

			collection.insert(user, {safe: true}, function(err, user){
				db.close();
				callback(err, user);
			});
		});
	});
};

User.get = function(name, callback) {
	//打开数据库
	  db.open(function(err, db){
	    if(err){
	      return callback(err);
	    }
	    //读取 users 集合
	    db.collection('users', function(err, collection){
			if(err){
				db.close();
				return callback(err);
			}
			//查找用户名 name 值为 name文档
			collection.findOne({name: name},function(err, doc){
				db.close();
				if(doc){
				  var user = new User(doc);
				  callback(err, user);//成功！返回查询的用户信息
				} else {
				  callback(err, null);//失败！返回null
				}
			});
	    });
	});
};