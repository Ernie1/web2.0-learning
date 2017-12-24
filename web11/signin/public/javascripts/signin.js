$(function(){
	$("#reset").on("click",function(){
		$("input").removeAttr("value");
		$(".error").text("");
	});
});