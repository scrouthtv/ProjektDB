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
	var params = "hello=test"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//alert(xhttp.responseText);
		}
	};
	xhttp.open("GET", "push.php" + "?" + params, true);
	xhttp.send();
}

function pull() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//alert(this.responseText);
			var list = JSON.parse(this.responseText);
			var table = document.getElementById("adminList");
			for (const item of list) {
				if (table.rows.namedItem(item.id) == null) {
					var row = table.insertRow(-1);
					row.id = item.id;

					var who = row.insertCell(0);
					var room = row.insertCell(1);
					var what = row.insertCell(2);
					var why = row.insertCell(3)
					who.innerHTML = item.who;
					room.innerHTML = item.room;
					what.innerHTML = item.what;
					why.innerHTML = item.why;

				}
			}
			for (const item of table.rows) {
				if (list.filter(i => i.id == item.id).length == 0) {
					//table.deleteRow(item.rowIndex);
					item.style.webkitAnimation = "fadeOut 5s";
					item.style.animation = "fadeOut 5s";

					//item.addEventListener("webkitAnimationEnd", removeTR(table, item));
					//item.addEventListener("animationEnd", removeTR(table, item));
					item.addEventListener("animationStart", console.log("start"));
					item.addEventListener("animationEnd", console.log("end"));
				}
			}
		}
	};
	xhttp.open("GET", "pull.php", true);
	xhttp.send();
}

// Chrome Dev fires both webkitAnimationEndnimationEnd and animationEnd so use
// function to remove *only one item* after an animation
function removeTR(table, item) {
	if (table.rows.namedItem(item.id) != null)
		table.deleteRow(item.rowIndex)
}
