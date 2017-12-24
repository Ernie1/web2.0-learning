if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	document.write('<meta content="width=device-width,height=device-height,initial-scale=1,user-scalable=no" name="viewport">');
	document.write('<link rel="stylesheet" type="text/css" href="mobile.css">');
}
else
	document.write('<link rel="stylesheet" type="text/css" href="style.css">');

var refresh = true;
var pre = '', now = '';
var par = 0;
var ans = '';
function mem() {
	document.calculator.memory.value += ans;
	ans = '';
	document.getElementById('upScn').scrollTop = document.getElementById('upScn').scrollHeight;
}
function fit() {
	var len = document.calculator.display.value.length;
	if (len <= 10)
		document.getElementById('scn').style.fontSize = 40 + 'px';
	else
		document.getElementById('scn').style.fontSize = 400 / len + 'px';
}
function C() {
	document.calculator.display.value = '';
	pre = now = '';
	document.calculator.memory.value += ans;
	ans = '';
	fit();
}
function del() {
	if (document.calculator.display.value != '') {
		if (ans != '') {
			if(ans=='NaN' || ans=='Infinity' || ans == '-Infinity'){
				document.calculator.display.value='';
				mem();
				return;
			}
			now = ans.substring(0, ans.length - 1);
			mem();
		}
		else {
			if (now != '')
				now = now.substring(0, now.length - 1);
			else {
				var l = pre[pre.length - 1];
				if (l == ')')
					par++;
				else if (l == '(')
					par--;
				pre = pre.substring(0, pre.length - 1);
				var i;
				for (i = pre.length - 1; i >= 0; i--)
					if (pre[i] < '0' || pre[i] > '9')
						break;

				now = pre.substr(i + 1, pre.length - i - 1);
				pre = pre.substring(0, i + 1);
			}
		}
		document.calculator.display.value = document.calculator.display.value.substring(0, document.calculator.display.value.length - 1);
		fit();
	}
}
function leftpar() {
	var p = pre + now;
	if (p[p.length - 1] == '.')
		return;
	if (p[p.length - 1] >= '0' && p[p.length - 1] <= '9' || p[p.length - 1] == ')') {
		pre = p + '*(';
		document.calculator.display.value += '×(';
	}
	else {
		if (p == '' && ans != '') {
			mem();
			pre = document.calculator.display.value + '*(';
			document.calculator.display.value += '×(';
		}
		else {
			pre = p + '(';
			document.calculator.display.value += '(';
		}
	}
	now = '';
	par++;
	fit();
}
function rightpar() {
	var p = pre + now;
	if (par == 0 || (p[p.length - 1] != ')' && (p[p.length - 1] < '0' || p[p.length - 1] > '9')))
		return;
	pre = p + ')';
	document.calculator.display.value += ')';
	now = '';
	par--;
	fit();
}
function dot() {
	if (now == '') {
		if (pre == '') {
			mem();
			document.calculator.display.value = '';
		}
		now += '0.';
		document.calculator.display.value += '0.';
	}
	else if (now.indexOf('.') == -1) {
		now += '.';
		document.calculator.display.value += '.';
	}
	fit();
}
function num(n) {
	if (now.length >= 15)
		return;
	if (now == '0') {
		now = n;
		document.calculator.display.value = document.calculator.display.value.substring(0, document.calculator.display.value.length - 1);
		document.calculator.display.value += n;
	}
	else if (now != '') {
		now += n;
		document.calculator.display.value += n;
	}
	else if (pre[pre.length - 1] != ')') {
		if (pre == '') {
			mem();
			document.calculator.display.value = '';
		}
		now += n;
		document.calculator.display.value += n;
	}
	fit();
}
function op(n) {
	var p = pre + now;
	if (p == '' && ans != '') {
		mem();
		p = pre = document.calculator.display.value;
	}
	else if (p[p.length - 1] == '.')
		return;
	else if ((p == '' || p[p.length - 1] == '(') && n != 3)
		return;
	else if(p[p.length - 1] == '-' && (p.length == 1 || p[p.length - 2] == '('))
		return;
	if (p[p.length - 1] == '/' || p[p.length - 1] == '*' || p[p.length - 1] == '-' || p[p.length - 1] == '+') {
		p = p.substring(0, p.length - 1);
		document.calculator.display.value = document.calculator.display.value.substring(0, document.calculator.display.value.length - 1);
	}
	if (n == 1) {
		pre = p + '/';
		document.calculator.display.value += '÷';
	}
	else if (n == 2) {
		pre = p + '*';
		document.calculator.display.value += '×';
	}
	else if (n == 3) {
		pre = p + '-';
		document.calculator.display.value += '-';
	}
	else {
		pre = p + '+';
		document.calculator.display.value += '+';
	}
	now = '';
	fit();
}
function equal() {
	var p = pre + now;
	if (pre == '' || par != 0 || (p[p.length - 1] != ')' && (p[p.length - 1] < '0' || p[p.length - 1] > '9')))
		return;
	try {
		ans = eval(pre + now) + '';
		if (document.calculator.memory.value != '')
			document.calculator.memory.value += '\n';
		document.calculator.memory.value += document.calculator.display.value + '=';
		document.getElementById('upScn').scrollTop = document.getElementById('upScn').scrollHeight;
		document.calculator.display.value = ans;
		fit();
		pre = now = '';
	}
	catch (exception) {
		alert(exception);
	}
}