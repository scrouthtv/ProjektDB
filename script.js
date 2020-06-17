function checkInput() {
	if(document.getElementById("who").value == "" ||
		document.getElementById("room").value == "" ||
		document.getElementById("what").value == "" ||
		document.getElementById("why").value == "") {
		document.getElementById("submit").disabled=true;
		document.getElementById("submit").innerHTML="✗";
	} else {
		document.getElementById("submit").disabled=false;
		document.getElementById("submit").innerHTML="✓";
	}
}

function push() {
	var xhtpp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(xhttp.responseText);
		}
	};
	xhttp.open("GET", "push.php", true);
	xhttp.send();
}
