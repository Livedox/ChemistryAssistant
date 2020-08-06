<?php
	$data = json_decode(file_get_contents('php://input'));
	if(isset($data)) {
		$symbol = $data->symbol;

		$mysqli = new mysqli("localhost", "root", "", "tabledata");
		$mysqli->query("SET NAMES 'utf8'");

		$query = "SELECT * FROM `data` WHERE `symbol` = '".$symbol."'";

		$result = $mysqli->query($query);
		echo json_encode(mysqli_fetch_assoc($result));

		$mysqli->close();
	}
?>