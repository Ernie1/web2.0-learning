//16340286，第20组，打地鼠，js文件
window.onload = function () {

	(function () {

		(function () {
			var frag = document.createDocumentFragment();
			for (var i = 0; i < 6; ++i) {
				for (var j = 0; j < 10; ++j) {
					var newButton = document.createElement("button");
					newButton.classList.add('moles');
					newButton.index = i * 10 + j;
					frag.appendChild(newButton);
				}
				var br = document.createElement("br");
				frag.appendChild(br);
			}
			document.getElementById("game").appendChild(frag);
		})();
		

		var now = parseInt(Math.random() * 60, 10);
		var score = 0;
		var start = false;
		var time = 30;
		var moleList = document.getElementsByClassName('moles');
		var int;

		function startTime() {
			int = setInterval(function () {
				document.getElementById("time").innerHTML = time--;
				if (time == -2) {
					stop();
				}
			}, 1000);
		}

		function stop() {
			if (start) {
				document.getElementById('info').innerText = 'Game Over';
				clearInterval(int);
				start = false;
				alert("Game Over.\nYour score is: " + score);
				time = 30;
				score = 0;
				document.getElementById("time").innerHTML = 0;
				moleList[now].classList.remove('target');
			}
		}

		document.getElementById("start").onclick = function () {
			if (!start) {
				document.getElementById('info').innerText = 'Playing';
				document.getElementById("score").innerText = score;
				document.getElementById("time").innerHTML = time--;
				start = true;
				moleList[now].classList.add('target');
				startTime();
			}
		}

		document.getElementById("stop").onclick = stop;

		document.getElementById("game").onclick = function (event) {
			if (start && event.target.classList.contains('moles')) {
				if (event.target.index == now) {
					score++;
					moleList[now].classList.remove('target');
					now = parseInt(Math.random() * 60, 10);
					moleList[now].classList.add('target');
				}
				else {
					event.target.classList.add('focus');
					setTimeout(function () {
						event.target.classList.remove('focus');
					}, 100);
					--score;
				}
				document.getElementById("score").innerText = score;
			}

		};

	})();
}