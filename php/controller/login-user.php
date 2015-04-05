<?php
	require_once(__DIR__ . "/../model/config.php");//executes file from here and concatentates the directory from here

	$array = array(
		'exp'=> '',
		'exp1'=> '',
		'exp2'=> '',
		'exp3'=> '',
		'exp4'=> '',
		
		);

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); //filters the input of the username and sanitizes from username
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); //filters the input of the password and sanitizes from password

	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username ='$username'");//creates a table by query that sets email username password(as a hashed password) and salt

	if ($query->num_rows == 1) {
		# code...
		$row = $query->fetch_array();

		if($row["password"] === crypt($password, $row["salt"])) {
			$_SESSION["authenticated"] = true;

			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];
			$_SESSION["name"] = $username; 

			echo json_encode($array);
			// header("Location: " . $path . "index.php");
		}
		else {
			# code...
			echo "Invalid username and password";
		}
	}
	else{
		echo "Invalid username and password";
	}
?>
