"use strict";
var database = {}; //字符串下标用对象较好 https://www.cnblogs.com/ZJAJS/archive/2013/01/19/2867847.html
var http = require("http"),
	fs = require("fs"),
	querystring = require("querystring"), //字符串转js对象
	url = require("url"),
	swig = require("swig");

swig.setDefaults({
	cache: false
});

var server = http.createServer(function(req, res) {
	if(req.url == "/style.css")
		loadFile(res, "style.css", "text/css");
	else if(req.url == "/validate.js")
		loadFile(res, "validate.js", "text/javascript");
	else if(req.method == "POST")
		handlePOST(req, res);
	else { //直接输入网址
		var userInfo = database[querystring.parse(url.parse(req.url).query).username];
		if(userInfo)
			loadFile(res, "detail.html", "text/html", userInfo);
		else
			loadFile(res, "signup.html", "text/html");
	}
}).listen(8000, function() {
	console.log("Server is listening on \"localhost:8000\"");
});

function loadFile(res, path, mime, options) {
	res.writeHead(200, {
		"Content-Type": mime
	});
	res.end(swig.renderFile(path, options));
}

function handlePOST(req, res) {
	var content = "";
	req.on("data", function(chunk) {
		content += chunk;
	});
	req.on("end", function() {
		var user = querystring.parse(content);
		if(handleDuplicateCheck(user) === true) {
			database[user.username] = user;
			res.writeHead(301, {
				"location": "?username=" + encodeURIComponent(user.username)
			}); //	防止中文报错，虽然这里不会有中文 http://blog.csdn.net/bbhe_work/article/details/51983285
			res.end();
		} else
			loadFile(res, "signup.html", "text/html", user);
	});
}

function handleDuplicateCheck(user) {
	var flag = true;
	if(database[user.username]) {
		user.up = "\"" + user.username + "\"" + "已被注册";
		user.username = "";
		flag = false;
	}
	for(var i in database) {
		if(database[i].stuId == user.stuId) {
			user.sp = "\"" + user.stuId + "\"" + "已被注册";
			user.stuId = "";
			flag = false;
		}
		if(database[i].phone == user.phone) {
			user.pp = "\"" + user.phone + "\"" + "已被注册";
			user.phone = "";
			flag = false;
		}
		if(database[i].email == user.email) {
			user.ep = "\"" + user.email + "\"" + "已被注册";
			user.email = "";
			flag = false;
		}
	}
	return flag;
}