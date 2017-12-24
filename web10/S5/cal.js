$(function(){
	function aHandler(currentSum,callback){
		var request;
		var me=$("#bA");
		var myNum=me.children(".unread");
		myNum.show().text("...");
		me.parent().children().trigger("disabled");
		me.removeClass("grey");
		request=$.get("http://localhost:3000",function(data){
			if(Math.round(Math.random()))	//随机失败
				callback("A：“这是个天大的秘密”的否定形式",currentSum);
			else{
				myNum.text(data);
				me.removeClass("noNum").trigger("disabled");
				$(".noNum").trigger("enabled");
				$("#message").text("A：这是个天大的秘密");
				callback(null,parseInt(currentSum)+parseInt(data));
			}
		});		
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			$("#message").text("");
			if(request)
				request.abort();
		});
	}
	function bHandler(currentSum,callback){
		var request;
		var me=$("#bB");
		var myNum=me.children(".unread");
		myNum.show().text("...");
		me.parent().children().trigger("disabled");
		me.removeClass("grey");
		request=$.get("http://localhost:3000",function(data){
			if(Math.round(Math.random()))	//随机失败
				callback("B：“我不知道”的否定形式",currentSum);
			else{
				myNum.text(data);
				me.removeClass("noNum").trigger("disabled");
				$(".noNum").trigger("enabled");
				$("#message").text("B：我不知道");
				callback(null,parseInt(currentSum)+parseInt(data));
			}
		});		
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			$("#message").text("");
			if(request)
				request.abort();
		});
	}
	function cHandler(currentSum,callback){
		var request;
		var me=$("#bC");
		var myNum=me.children(".unread");
		myNum.show().text("...");
		me.parent().children().trigger("disabled");
		me.removeClass("grey");
		request=$.get("http://localhost:3000",function(data){
			if(Math.round(Math.random()))	//随机失败
				callback("C：“你不知道”的否定形式",currentSum);
			else{
				myNum.text(data);
				me.removeClass("noNum").trigger("disabled");
				$(".noNum").trigger("enabled");
				$("#message").text("C：你不知道");
				callback(null,parseInt(currentSum)+parseInt(data));
			}
		});		
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			$("#message").text("");
			if(request)
				request.abort();
		});
	}
	function dHandler(currentSum,callback){
		var request;
		var me=$("#bD");
		var myNum=me.children(".unread");
		myNum.show().text("...");
		me.parent().children().trigger("disabled");
		me.removeClass("grey");
		request=$.get("http://localhost:3000",function(data){
			if(Math.round(Math.random()))	//随机失败
				callback("D：“他不知道”的否定形式",currentSum);
			else{
				myNum.text(data);
				me.removeClass("noNum").trigger("disabled");
				$(".noNum").trigger("enabled");
				$("#message").text("D：他不知道");
				callback(null,parseInt(currentSum)+parseInt(data));
			}
		});		
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			$("#message").text("");
			if(request)
				request.abort();
		});
	}
	function eHandler(currentSum,callback){
		var request;
		var me=$("#bE");
		var myNum=me.children(".unread");
		myNum.show().text("...");
		me.parent().children().trigger("disabled");
		me.removeClass("grey");
		request=$.get("http://localhost:3000",function(data){
			if(Math.round(Math.random()))	//随机失败
				callback("E：“才怪”的否定形式",currentSum);
			else{
				myNum.text(data);
				me.removeClass("noNum").trigger("disabled");
				$(".noNum").trigger("enabled");
				$("#message").text("E：才怪");
				callback(null,parseInt(currentSum)+parseInt(data));
			}
		});
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			$("#message").text("");
			if(request)
				request.abort();
		});
	}
	function bubbleHandler(sum){
		$(".grey").removeClass("grey");
		$("#sum").text(sum);
		$("#info-bar").trigger("disabled");
		$("#message").text("楼主异步调用战斗力感人，目测不超过"+sum);
	}
	$(".apb").on("click",function(){
		var order=new Array('D','E','C','A','B');
		order.sort(function(a,b){return 0.5-Math.random();});
		$("#order").text(order);
		var handlers={A:aHandler,B:bHandler,C:cHandler,D:dHandler,E:eHandler};
		var i=0;
		function next(message,sum){
			if(message){
				$("#message").text(message);
				--i;
			}
			if(i<5)
				handlers[order[i++]](sum,next);
			else
				bubbleHandler(sum);
		}
		next(null,0);
	});
	$(".button").on("numNotReady",function(){
		$(this).addClass("noNum").children(".unread").hide();
	});
	$(".button, #info-bar").on("disabled",function(){
		$(this).prop("disabled",true).addClass("disabled").addClass("grey");
		if($(".noNum").length==0)
			$("#info-bar").trigger("enabled");
	});
	$(".button, #info-bar").on("enabled",function(){
		$(this).prop("disabled",false).removeClass("disabled").removeClass("grey");
	});
	$("#info-bar").on("click",function(){
		if(!$("#info-bar").prop("disabled")){
			$(".grey").removeClass("grey");
			var sum=0;
			$(".unread").each(function(){
				sum+=parseInt($(this).text());
			});
			$("#sum").text(sum);
			$("#info-bar").trigger("disabled");
		}
	});
	$(".button").on("click",function(){
		var request;
		if(!$(this).prop("disabled")){
			var me=$(this);
			var myNum=me.children(".unread");
			myNum.show().text("...");
			me.parent().children().trigger("disabled");
			me.removeClass("grey");
			request=$.get("http://localhost:3000",function(data){
				myNum.text(data);
				me.removeClass("noNum").trigger("disabled");
				$(".noNum").trigger("enabled");
			});
		}
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			$("#message").text("");
			if(request)
				request.abort();
		});
	});
	(function(){
		$(".button").trigger("numNotReady").trigger("enabled");
		$("#info-bar").trigger("disabled");
	})();
});