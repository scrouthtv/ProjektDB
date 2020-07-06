<?php

#print_r($_GET);

# requires "who" "room" "what" "why" via get

require("errors.php");

if (array_key_exists("action", $_GET)) {
	if ($_GET["action"] == "add") {
		if (array_key_exists("who", $_GET) && array_key_exists("room", $_GET)
			&& array_key_exists("what", $_GET) && array_key_exists("why", $_GET)) {

			require("credentials.php");
			$mysqli = new mysqli($DB_ADDRESS, $DB_USER, $DB_PASS, $DB_NAME);
			if ($mysqli -> connect_errno) printError($mysqli -> connect_error);

			$teacherID = id_teacher($mysqli, $_GET["who"]);

			$sql = "INSERT INTO `Fehlermeldung` (`Datum`, `Beschreibung`, `Melder`) VALUES ('" . strftime("%Y-%m-%d") . "', '" . $_GET["why"] . "', '" . $teacherID . "');";
			if ($mysqli -> query($sql) === TRUE) {
				$id = $mysqli -> insert_id;

				# FIXME storing $_GET["why"] twice?!
				# FIXME what is Zustand supposed to store?!
				$insert_device_sql = "INSERT INTO `Geräte` (`Bezeichnung`, `Art des Gerätes`, `Zustand`, `Fehlermeldung`) VALUES ('" . $_GET["why"] . "', '" . $_GET["what"] . "',  '', '" . $id . "')";

				if ($mysqli -> query($insert_device_sql) === TRUE) {
					$deviceID = $mysqli -> insert_id;
					$insert_room_sql = "INSERT INTO `Räume` (`Bezeichnung`, `Geräte`) VALUES ('" . $_GET["room"] . "', '" . $deviceID . "');";

					if ($mysqli -> query($insert_room_sql) == TRUE) {
						printSuccess();

					} else printError($mysqli -> error);
				} else printError($mysqli -> error);
			} else printError($mysqli -> error);
		} else missingArgument("who, room, what, why");

	} else if ($_GET["action"] == "remove") {
		if (array_key_exists("id", $_GET)) {
			require("credentials.php");
			$mysqli = new mysqli($DB_ADDRESS, $DB_USER, $DB_PASS, $DB_NAME);
			if ($mysqli -> connect_errno) printError($mysqli -> connect_error);

			# FIXME remove stale foreign keys
			$delete_sql = "DELETE FROM `Fehlermeldung` WHERE `Fehlermeldung-ID` = '" . $_GET["id"] . "'";
			if ($mysqli -> query($delete_sql) === TRUE)
				printSuccess();
			else
				printError($mysqli -> error);

		} else echo missingArgument("id");
	} else unsupported($_GET["action"]);
} else missingArgument("action");

function id_teacher($mysqli, $who) {
	# sql command to search for this teacher
	$query_teacher_sql = "SELECT `Lehrer-ID` FROM `Lehrer` WHERE `Kürzel` = '" . $who . "' OR `Name` = '" . $who . "';";
	# sql command to insert this teacher
	$insert_teacher_sql = "INSERT INTO `Lehrer` (`Kürzel`, `Name`) VALUES ('" . $who . "', '" . $who . "');";

	# search for this teacher
	$result = $mysqli -> query($query_teacher_sql);
	if ($result -> num_rows == 0) { # teacher does not exist
		if ($mysqli -> query($insert_teacher_sql) === TRUE) { # insert them
			$result = $mysqli -> query($query_teacher_sql); # search again
		} else {
			printError($mysqli -> error);
		}
	}

	# assume there is only *one* record with this teacher
	$row = $result -> fetch_assoc();

	return $row["Lehrer-ID"];
}

?>
