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
			const container = document.getElementById("container");
			const table = Array.prototype.slice.call(container.children);
			for (const item of list) {
				if (table.filter(j => j.id == item.id).length == 0) {
					console.log("have to insert " + item);

					//var elem = '<div id="' + item.id + '" class="container adminItem" style="animation: 0.5s;">';
					var elem = '<span class="adminRoom">' + item.room + '</span>';
					elem += '<span class="adminWhat">' + item.what + '</span>';
					elem += '<span class="adminWho">' + item.who + '</span>';
					elem += '<span class="adminX"><button onclick="pushRemoval(' + item.id + ');">✗</button></span>';
					elem += '<span class="adminWhy">' + item.why + '</span>';
					//elem += '</div>';

					var div = document.createElement("div");
					div.id = item.id;
					div.innerHTML = elem;
					div.classList.add("container");
					div.classList.add("adminItem");
					div.style.animation = "0.5s ease 0s 1 normal none running fadeIn";
					console.log(div);

					container.insertBefore(div, document.getElementById("reload"));
					//document.getElementById("container").insertAdjacentHTML("beforeend", elem);
				}
			}
			for (const item of table) {
				if (item.id == "reload") break;
				if (list.filter(i => i.id == item.id).length == 0) {
					console.log("have to delete " + item.id);
					item.style.webkitAnimation = "fadeOut .3s";
					item.style.animation = "fadeOut .3s";

					item.addEventListener("webkitAnimationEnd", ev => {item.remove()});
					item.addEventListener("animationend", ev => {item.remove()});
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
