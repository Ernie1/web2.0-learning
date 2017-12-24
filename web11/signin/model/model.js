module.exports = function(collection) {
	var bcrypt = require('bcryptjs');
	this.userCheck = function(user, feedback) {
		feedback.user = user;
		feedback.error = {};
		var flag = true;
		//格式验证
		if(!user.username.match(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/)) {
			feedback.error.up = "6~18位英文字母、数字或下划线，必须以英文字母开头";
			flag = false;
		}
		if(!user.stuId.match(/^[1-9][0-9]{7}$/)) {
			feedback.error.sp = "8位数字，不能以0开头";
			flag = false;
		}
		if(!user.phone.match(/^[1-9][0-9]{10}$/)) {
			feedback.error.pp = "11位数字，不能以0开头";
			flag = false;
		}
		if(!user.email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
			feedback.error.ep = "请输入正确的邮箱";
			flag = false;
		}
		if(!user.password.match(/^[a-zA-Z0-9-_]{6,12}$/)) {
			feedback.error.pap = "密码为6~12位数字、大小写字母、中划线、下划线";
			flag = false;
		}
		//重复验证
		if(flag) {
			//http://coding.imooc.com/learn/questiondetail/442.html
			return Promise.all([
				findData({"username": user.username}).catch((reason)=>{
					feedback.error.up = "\"" + user.username + "\"" + "已被注册";
					feedback.user.username = "";
					flag = false;
				}),
				
				findData({"stuId": user.stuId}).catch((reason)=>{
					feedback.error.sp = "\"" + user.stuId + "\"" + "已被注册";
					feedback.user.stuId = "";
					flag = false;
				}),
				
				findData({"phone": user.phone}).catch((reason)=>{
					feedback.error.pp = "\"" + user.phone + "\"" + "已被注册";
					feedback.user.phone = "";
					flag = false;
				}),
				findData({"email": user.email}).catch((reason)=>{
					feedback.error.ep = "\"" + user.email + "\"" + "已被注册";
					feedback.user.email = "";
					flag = false;
				})
			]).then((value)=>{
				if(flag)
					return Promise.resolve(true);
				else
					return Promise.reject(false);
			});
		}
		else
			return Promise.reject(false);
	};
	this.member = function(user){
			return collection.findOne({
				"username": user.username
			}).then((document)=>{
				if(document){
					return bcrypt.compare(user.password, document.password).then((res)=>{
						return res? Promise.resolve(true):Promise.reject(false);
					});
				}
				else
					return Promise.reject(false);
			});
	};
	function findData(object){
		return collection.findOne(object).then((user)=>{
			return user?Promise.reject(false):Promise.resolve(true);
		});
	}
};