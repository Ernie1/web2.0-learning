$(function(){
	$(".apb").on("click",function(){
		var i=0;
		function next(){
			if(i<5)
				$(".button").eq(i++).trigger("autoclick",next);
		}
		next();
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
		if(!$(this).prop("disabled")){
			$(".grey").removeClass("grey");
			var sum=0;
			$(".unread").each(function(){
				sum+=parseInt($(this).text());
			});
			$("#sum").text(sum);
			$(this).trigger("disabled");
		}
	});
	$(".button").on("click",function(event){
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
			if(request)
				request.abort();
		});
	});
	$(".button").on("autoclick",function(event,callback){
		var request;
		var me=$(this);
		var myNum=me.children(".unread");
		myNum.show().text("...");
		me.parent().children().trigger("disabled");
		me.removeClass("grey");
		request=$.get("http://localhost:3000",function(data){
			myNum.text(data);
			me.removeClass("noNum").trigger("disabled");
			$(".noNum").trigger("enabled");
			$("#info-bar").trigger("click");
			if(callback)
				callback();
		});		
		$("#bottom-positioner").on("mouseleave",function(){
			$(".button").trigger("numNotReady").trigger("enabled");
			$("#sum").text("");
			$("#info-bar").trigger("disabled");
			$("#order").text("");
			if(request)
				request.abort();
		});
	});
	(function(){
		$(".button").trigger("numNotReady").trigger("enabled");
		$("#info-bar").trigger("disabled");
	})();
});