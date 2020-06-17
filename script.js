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
	const params = "action=add"
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(xhttp.responseText);
		}
	};
	xhttp.open("GET", "push.php" + "?" + params, true);
	xhttp.send();
	// TODO clear form after submit success
}

function pull() {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//alert(this.responseText);
			const list = JSON.parse(this.responseText);
			const table = document.getElementById("adminList");
			for (const item of list) {
				if (table.rows.namedItem(item.id) == null) {
					var row = table.insertRow(-1);
					row.id = item.id;

					var who = row.insertCell(0);
					var room = row.insertCell(1);
					var what = row.insertCell(2);
					var why = row.insertCell(3);
					var remove = row.insertCell(4);
					who.innerHTML = item.who;
					room.innerHTML = item.room;
					what.innerHTML = item.what;
					why.innerHTML = item.why;
					remove.innerHTML = "<button onclick='pushRemoval(" + item.id + ");'>✗</button>";

					row.style.webkitAnimation = "fadeIn .5s";
					row.style.animation = "fadeIn .5s";
				}
			}
			for (const item of table.rows) {
				if (list.filter(i => i.id == item.id).length == 0) {
					//table.deleteRow(item.rowIndex);
					item.style.webkitAnimation = "fadeOut .3s";
					item.style.animation = "fadeOut .3s";

					//item.addEventListener("webkitAnimationEnd", removeTR(table, item));
					//item.addEventListener("animationEnd", removeTR(table, item));
					//item.addEventListener("animationStart", console.log("start"));
					item.addEventListener("webkitAnimationEnd", ev => {removeTR(table, item)});
					item.addEventListener("animationend", ev => {removeTR(table, item)});
				}
			}
		}
	};
	xhttp.open("GET", "pull.php", true);
	xhttp.send();
}

function pushRemoval(id) {
	const params = "action=remove&id=" + id
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(xhttp.responseText);
		}
	};
	xhttp.open("GET", "push.php" + "?" + params, true);
	xhttp.send();
}

// Chrome Dev fires both webkitAnimationEndnimationEnd and animationEnd so use
// function to remove *only one item* after an animation
function removeTR(table, item) {
	if (table.rows.namedItem(item.id) != null)
		table.deleteRow(item.rowIndex)
}
