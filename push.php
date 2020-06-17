<?php

print_r($_GET);

# requires "who" "room" "what" "why" via get

if (array_key_exists("who", $_GET) && array_key_exists("room", $_GET)
	&& array_key_exists("what", $_GET) && array_key_exists("why", $_GET)) {
	# TODO
} else {
	echo -1;
}

?>
