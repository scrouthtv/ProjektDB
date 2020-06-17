<?php

print_r($_GET);

# requires "who" "room" "what" "why" via get

if (array_key_exists("action", $_GET)) {
	if ($_GET["action"] == "add") {
		if (array_key_exists("who", $_GET) && array_key_exists("room", $_GET)
			&& array_key_exists("what", $_GET) && array_key_exists("why", $_GET)) {
			# TODO

			echo "Erfolgreich (not impl)";
		} else echo "Fehlende Parameter who, room, what, why";

	} else if ($_GET["action"] == "remove") {
		if (array_key_exists("id", $_GET)) {
			# TODO

			echo "Erfolgreich (not impl)";
		} else echo "Fehlende Parameter id";
	} else echo "Unbekannte Aktion " . $_GET["action"];
} else echo "Fehlender Parameter action";

?>
