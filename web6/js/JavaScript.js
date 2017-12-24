//16340286，第20组，拼图，js文件
window.onload=function(){
	//创建puzzle
	var colNum=4,rowNum=4;
	var begin;
	var array;
	function fresh(){
		for(var i=0;i<rowNum;++i)
			for(var j=0;j<colNum;++j){
				$("#full-"+i+"-"+j).remove();
			}
		var s=document.getElementById("mystyle");
		s.parentNode.removeChild(s);
	}
	function init(){
		var frag=document.createDocumentFragment();
		//http://blog.csdn.net/qq_17335153/article/details/49865497
		var style=document.createElement('style');
		style.id="mystyle";
	    style.type='text/css';
	    style.rel='stylesheet';
	    
		for(var i=0;i<rowNum;++i)
			for(var j=0;j<colNum;++j){
				var s=document.createElement("span");
				if(i==rowNum-1&&j==colNum-1)
					s.classList.add("box","blank","pos-"+i+"-"+j);
				else
					s.classList.add("box","full","pos-"+i+"-"+j);
				s.id="full-"+i+"-"+j;
				frag.appendChild(s);
				style.appendChild(document.createTextNode(".pos-"+i+"-"+j+" {transform: translate("+(480/colNum)*j+"px,"+(480/rowNum)*i+"px)}"));
			}
		$("#game").append(frag);
		style.appendChild(document.createTextNode(".box{ position: absolute; height: "+(480/rowNum)+"px; width: "+(480/colNum)+"px}"));
		document.getElementsByTagName('head')[0].appendChild(style);
		
		//动态添加样式表,不知道是不是侵入式代码
		for(var i=0;i<rowNum;++i)
			for(var j=0;j<colNum;++j)
				if(i!=rowNum-1||j!=colNum-1)
					$("#full-"+i+"-"+j).css({"position":"absolute","background-position":"top "+(-(480/rowNum)*i)+"px "+"left "+(-(480/colNum)*j)+"px"});
	
		begin=false;
		array=new Array();
		for(var i=1;i<=rowNum*colNum;++i)
			array.push(i);
			
		hint();
	}
	init();
	
	$("#begin").click(function(){
		begin=true;
		$("#begin").text("重新开始");
		$("#full-"+(rowNum-1)+"-"+(colNum-1)).removeClass("win");
		//判断有无解 http://ytydyd.blog.sohu.com/145014635.html
		var noSol=true;
		while(noSol){
			array.sort(function(a,b){return 0.5-Math.random();});
			var inverseNum=0;
			for(var i=1;i<rowNum*colNum;++i)
				for(var j=0;j<i;++j)
					if(array[j]>array[i])
						++inverseNum;
			var indexOfBlank=array.findIndex(function(e){return e==rowNum*colNum;});
			if(colNum==rowNum)
				noSol=(rowNum+colNum-2-parseInt(indexOfBlank/colNum)-parseInt(indexOfBlank%colNum)+inverseNum)%2==(rowNum%2+1)%2;
			else
				noSol=false;
		}
		//打乱
		for(var i=0;i<colNum*rowNum;++i){
			var handle=$("#full-"+parseInt((array[i]-1)/colNum)+"-"+parseInt((array[i]-1)%colNum));
			var handleClass=handle.attr("class").split(" ");
			handle.removeClass(handleClass[2]);	
			handle.addClass("pos-"+parseInt(i/colNum)+"-"+parseInt(i%colNum));
		}
	});
	
	$("#getRow").change(function(){
		fresh();
		rowNum=$(this).val();
		init();
	})
	$("#getCol").change(function(){
		fresh();
		colNum=$(this).val();
		init();
	})
	$(document).on("click",".box",function(){
		if(begin){
			//移动方块
			var mePos=$(this).attr("class").split(" ")[2];
			var me=mePos.split("-");
			var blankPos=$("#full-"+(rowNum-1)+"-"+(colNum-1)).attr("class").split(" ")[2];
			var blank=blankPos.split("-");
			if(Math.pow(parseInt(blank[1])-parseInt(me[1]),2)+Math.pow(parseInt(blank[2])-parseInt(me[2]),2) == 1){
				$(this).removeClass(mePos);
				$(this).addClass(blankPos);
				$("#full-"+(rowNum-1)+"-"+(colNum-1)).removeClass(blankPos);
				$("#full-"+(rowNum-1)+"-"+(colNum-1)).addClass(mePos);
			}
			//判断赢
			var win=true;
			for(var i=0;i<colNum*rowNum;++i){
				if(!$("#full-"+parseInt(i/colNum)+"-"+parseInt(i%colNum)).hasClass("pos-"+parseInt(i/colNum)+"-"+parseInt(i%colNum))){
					win=false;
					break;
				}
			}
			if(win){
				begin=false;
				$("#begin").text("开始");
				$("#full-"+(rowNum-1)+"-"+(colNum-1)).addClass("win");
			}
		}
});
	function hint(){
		if($("#showHint").is(":checked"))
			for(var i=0;i<colNum*rowNum-1;++i)
				$("#full-"+parseInt(i/colNum)+"-"+parseInt(i%colNum)).text(i+1);
		else{
			for(var i=0;i<colNum*rowNum-1;++i)
				$("#full-"+parseInt(i/colNum)+"-"+parseInt(i%colNum)).text("");
		}
	}
	$("#showHint").click(hint);
}