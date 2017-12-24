$(function(){
	$("input").on("input",function(){
		if(this.validity.patternMismatch === true)
				this.setCustomValidity(this.title);
			else
				this.setCustomValidity("");
	});
	$("#reset").on("click",function(){
		$("input").removeAttr("value");
		$(".error").text("");
	});
	$("#password").on("input",function(){
		$("#password")[0].placeholder=$("#confirmPassword")[0].placeholder="";
		if(!this.validity.patternMismatch&&!this.validity.valueMissing)
			$(this).addClass("isValid");
		else
			$(this).removeClass("isValid");
		if($(this).val()!=$("#confirmPassword").val())
			$("#confirmPassword").removeClass("isValid");
		else if(!this.validity.valueMissing)
			$("#confirmPassword").addClass("isValid");
	});
	$("#confirmPassword").on("input",function(){
		$("#password")[0].placeholder=$("#confirmPassword")[0].placeholder="";
		if($(this).val()==$("#password").val()&&!this.validity.valueMissing&&!$("#password")[0].validity.patternMismatch)
			$(this).addClass("isValid");
		else
			$(this).removeClass("isValid");
	});
	$("#signupForm").submit(function(event){
		if(!$("#confirmPassword").hasClass("isValid")){
			event.preventDefault();
			$("#password").val("");
			$("#password").removeClass("isValid");
			$("#confirmPassword").val("");
			$("#password")[0].placeholder=$("#confirmPassword")[0].placeholder="密码不一致";
		}
	});
});