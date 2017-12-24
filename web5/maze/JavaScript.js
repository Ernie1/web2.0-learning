//16340286，第20组，迷宫，js文件
window.onload = function () {
	var start = 0;
	function info(str) {
		document.getElementsByClassName('info')[0].classList.add('fadeout');
		document.getElementsByClassName('info')[0].innerText = str;
	}
	document.addEventListener('mouseover', lose);
	function lose(event) {
		if (event.target.id == 'game') {
			if (start) {
				event.target.classList.add('cursor');
				start = 2;
			}
			else
				event.target.classList.remove('cursor');
		}
		else if (event.target.className == 'w') {
			if (start) {
				info('You Lose');
				event.target.classList.add('lose');
				start = 0;
			}
		}
		else if (event.target.className == 'end') {
			if (start == 2) {
				info('You Win');
				start = 0;
			}
			else if (start == 1) {
				info( 'Don\'t cheat, you should start from the \'S\' and move to the \'E\' inside the maze!');
				start = 0;
			}
		}
		else {
			if (event.target.className == 'start') {
				start = 1;
				info('');
				
			}
			document.getElementsByClassName('info')[0].classList.remove('fadeout');
			var list = document.getElementsByClassName('w');
			for (var i = 0; i < 6; ++i)
				list[i].classList.remove('lose');
			if (!start)
				info('Move your mouse over the "S" to begin.');
		}
	}

}