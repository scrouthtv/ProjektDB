<?php

require("errors.php");

require("credentials.php");
$mysqli = new mysqli($DB_ADDRESS, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli -> connect_errno) printError($mysqli -> connect_error);

$select_notices_query = "SELECT * FROM `Fehlermeldung`";
$result = $mysqli -> query($select_notices_query);

$select_reporter_query = "SELECT * FROM `Lehrer`";
$reporters = $mysqli -> query($select_reporter_query);

if ($result -> num_rows > 0) {
	$i = 0;
	while ($row = $result -> fetch_assoc()) {
		#echo $row["Fehlermeldung-ID"];
		#echo "--";
		#echo $result -> num_rows;

		echo '{';

		echo '"id": ' . $row["Fehlermeldung-ID"] . ", ";
		echo '"who": ' .

			echo '}';

		if (++$i < $result -> num_rows) echo ",";
		echo "<br />";
	}
} else {
	echo "[]";
}




#echo "[";
#echo '{"id": 5, "who": "me", "room": 27, "what": "Smartboard", "why": "Schaltet nicht ein"}';
#
#echo '{"id": 12, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 11, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"}';
#
#echo '{"id": 13, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 14, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 15, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 17, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 18, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 25, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"}';
#echo '{"id": 32, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 22, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 23, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 24, "who": "you", "room": 31, "what": "Beamer", "why": "flackert"},';
#echo '{"id": 31, "who": "sne", "room": 15, "what": "Apple TV", "why": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}';
#echo "]";

?>
