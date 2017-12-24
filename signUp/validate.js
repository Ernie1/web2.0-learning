window.onload = function() {
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; ++i) {
		inputs[i].addEventListener("input", function(event) {
			if(this.validity.patternMismatch === true)
				this.setCustomValidity(this.title);
			else
				this.setCustomValidity("");
		});
	}
	document.getElementById("reset").addEventListener("click", function() {
		for(var i = 0; i < inputs.length; ++i)
			inputs[i].removeAttribute("value");
	});
}