//16340286，第20组，计算器，js文件
window.onload=function(){
	var op=['+','-','*','/'];
	var prioraty={};
	prioraty['+']=prioraty['-']=1;
	prioraty['-']=prioraty['*']=2;

	//参照某网站的代码
	function myEval(exp){
		var inputStack = new Array();
		var outputStack = new Array();
		var outputQueue = new Array();

		while(exp!=''){
			if(op.indexOf(exp[0])!=-1||exp[0]=='('||exp[0]==')'){
				inputStack.push(exp[0]);
				exp=exp.substr(1);
			}
			else{
				var n=parseFloat(exp).toString();
				inputStack.push(n);
				var i;
				for(i=0;i<exp.length;++i){
					if(op.indexOf(exp[i])!=-1||exp[i]=='('||exp[i]==')')
						break;
				}
				exp=exp.substr(i);
			}
		}
		
		while(inputStack.length > 0){
			var cur = inputStack.shift();
			if(op.indexOf(cur)!=-1||cur=='('||cur==')'){
				if(cur == '(')
					outputStack.push(cur);
				else if(cur == ')'){
					var po = outputStack.pop();
					while(po != '(' && outputStack.length > 0){
						outputQueue.push(po);
						po = outputStack.pop();
					}
					if(po != '(')
						throw "error: unmatched ()";
				}else{
					while(prioraty[cur]<=prioraty[outputStack[outputStack.length - 1]] && outputStack.length > 0)
						outputQueue.push(outputStack.pop());
					outputStack.push(cur);
				}
			}
			else
				outputQueue.push(new Number(cur));
		}
			
		while(outputStack.length > 0){
			if(outputStack[outputStack.length - 1] == '(')
				throw "error: unmatched ()";
			outputQueue.push(outputStack.pop());
		}

		var output = new Array();
		while(outputQueue.length > 0){
			var cur = outputQueue.shift();
			
			if(!(op.indexOf(cur)!=-1||cur=='('||cur==')'))
				output.push(cur);
			else{
				if(output.length < 2)
					throw "unvalid stack length";

				var sec = output.pop();
				var fir = output.pop();
				
				var max = Math.max(sec.toString().split(".")[1]?sec.toString().split(".")[1].length:0, fir.toString().split(".")[1]?fir.toString().split(".")[1].length:0);
				
				var ans;
				if(cur=='+')
					ans = (fir*Math.pow(10, max) + sec*Math.pow(10, max))/Math.pow(10, max);
				else if(cur=='-')
					ans = (fir*Math.pow(10, max) - sec*Math.pow(10, max))/Math.pow(10, max);
				else if(cur=='*')
					ans = (fir*Math.pow(10, max) * sec*Math.pow(10, max))/Math.pow(10, 2*max);
				else if(cur=='/')
					ans = fir*Math.pow(10, max) / (sec*Math.pow(10, max));

				output.push(ans);
			}
		}

		if(output.length != 1)
			throw "unvalid expression";
		else
			return output[0];
	}

	var upScn = $("upScn");
	var scn = $("scn");
	var clear = false;
	var cache = '';

	//字体自适应
	//也许是侵入式代码
	//使用非侵入式实现这种功能，值得研究
	var fit = {
		get cache() {
			return cache;
		},
		set cache(v) {
			cache = v;
			if (scn.value != v)
				clear = false;
			upScn.value = '';
			scn.value = cache;
			if (scn.value.length > 10)
				scn.style.fontSize = 400 / scn.value.length + 'px';
			else
				scn.style.fontSize = 40 + 'px';
			scn.scrollTop = scn.scrollHeight;
			return cache;
		}
	};

	//设置onclick属性
	var disArray = document.getElementsByClassName("dis");
	for (i in disArray) {
		disArray[i].onclick = function () {
			if(!clear&&this.textContent=='.'&&(fit.cache.charAt(fit.cache.length-1)<'0'||fit.cache.charAt(fit.cache.length-1)>'9'))
				fit.cache=fit.cache+'0.';
			else if(this.textContent=='.'&&(clear||fit.cache==''))
				fit.cache='0.';
			else if(op.indexOf(this.textContent)!=-1&&op.indexOf(fit.cache.charAt(fit.cache.length-1))!=-1)
				fit.cache=fit.cache.substr(0,fit.cache.length-1)+this.textContent;
			else if(op.indexOf(this.textContent)!=-1)
				fit.cache += this.textContent;
			else if(this.textContent>='0'&&this.textContent<='9'&&fit.cache.charAt(fit.cache.length-1)=='0'&&fit.cache.charAt(fit.cache.length-2)!='.'&&(fit.cache.charAt(fit.cache.length-2)<'0'||fit.cache.charAt(fit.cache.length-2)>'9'))
				fit.cache=fit.cache.substr(0,fit.cache.length-1)+this.textContent;
			else if(clear)
				fit.cache = this.textContent;
			else
				fit.cache += this.textContent;
			var sum=0;
			for(var i=fit.cache.length-1;i>=0;--i){
				if(op.indexOf(fit.cache.charAt(i))!=-1||fit.cache.charAt(i)=='('||fit.cache.charAt(i)==')')
					break;
				if(fit.cache.charAt(i)=='.')
					++sum;
			}
			if(sum>1)
				fit.cache=fit.cache.substr(0,fit.cache.length-1);
			clear = false;
		}
	}
	$("clear").onclick = function () {
		fit.cache = "";
	}
	$("del").onclick = function () {
		if(!clear)
			fit.cache = fit.cache.substr(0, fit.cache.length - 1);
	}
	$("equal").onclick = function () {
		if(fit.cache!=''&&!clear){
			try {
				//eval(fit.cache);//仅用于合法性检验
				fit.cache = myEval(fit.cache).toString();
				clear = true;
			}
			catch (exception) {
				upScn.value = exception;
				upScn.scrollTop = upScn.scrollHeight;
			}
		}
	}

	//点击效果
	var buttonArray = document.getElementsByClassName("button");
	for (var i = 0; i < buttonArray.length; ++i) {
		buttonArray[i].addEventListener("click", function () {
			this.classList.add("buttonActive");
			var t = this;
			setTimeout(function () { t.classList.remove("buttonActive"); }, 50);
		});
	}

	//键盘输入
	onkeydown = function () {
		var key = window.event ? event.keyCode : event.which;
		if (key == 8 || key == 46)
			$("del").click();
		else if (key == 67)
			$("clear").click();
		else if (key==13)
			$("equal").click();
	}
	onkeypress = function () {
		var keychar = String.fromCharCode(window.event ? event.keyCode : event.which);
		if (keychar >= '0' && keychar <= '9' || keychar == '/' || keychar == '*' || keychar == '-' || keychar == '+' || keychar == '.' || keychar == '(' || keychar == ')')
			$('b' + keychar).click();
		else if(keychar=='c'||keychar=='C')
			$("clear").click();
	}

	//仿JQuery
	function $(id) {
		return document.getElementById(id);
	}
}