module.exports = function(db){
	
	var express = require('express');
	var router = express.Router();
	var bcrypt = require('bcryptjs'); 
	var collection = db.collection('userInfo');
	var modelModule = require('../model/model');
	var model = new modelModule(collection);
	/* GET home page. */
	router.get('/', function(req, res, next) {
		if(req.session.user){
			if(req.query.username && req.query.username!=req.session.user.username)
				res.render('detail', {user: req.session.user,error:{up:"只能够访问自己的数据"}});
			else
				res.render('detail', {user: req.session.user,error:{}});
		}
		else
			res.redirect('/signin');
	});
	
	router.get('/logout', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signin');
	});
	
	router.get('/signin', function(req, res, next) {
		if(req.session.user)
			res.redirect('/detail');
		else
			res.render('signin',{
				user: {},
				error: {}
			});
	});
	
	router.post('/signin',function(req, res, next) {
		var user = req.body;
		model.member(user).then((value)=>
			collection.findOne({
				"username": user.username
			})).then((document)=>{
				req.session.user = document;
				req.session.save();
			}).then((v)=> res.redirect('/detail'))
		.catch((reason)=>{
			res.render('signin', {
				user: user,
				error: {
					up: "错误的用户名或者密码"
				}
			});
		});	
	});
	
	router.get('/regist', function(req, res, next) {
		if(req.session.user)
			res.redirect('/detail');
		else
			res.render('signup', {
				user: {},
				error: {}
			});
	});
	
	router.post('/regist', function(req, res, next) {
		var feedback = {};
		var user = req.body;
		model.userCheck(user, feedback).then((value)=>{
			bcrypt.genSalt(10).then((salt) => 
				bcrypt.hash(user.password,salt)
			).then((hash) => {
				user.password = hash;
				req.session.user = user;
				collection.insertOne(user);
				res.redirect('/detail')
			});
		}).catch((reason)=>res.render('signup', feedback));
	});
	
	router.all('*', function(req, res, next) {
		if(req.path !== '/favicon.ico')
			return req.session.user ? next() : res.redirect('/signin');
	});
	
	router.get('/detail', function(req, res, next) {
		res.render('detail', {user: req.session.user,error:{}});
	});
	
	return router;
}
