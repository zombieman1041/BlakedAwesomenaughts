<?php
	require_once(__DIR__ . "/../model/config.php");//executes file from here and concatentates the directory from here

	
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); //filters the input of the username and sanitizes from username
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); //filters the input of the password and sanitizes from password

	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";		//

	$hashedPassword = crypt($password, $salt); //runs the crypt function which will pass in the password variable and to use the salt for a encrypted password

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "//creates a table by query that sets email username password(as a hashed password) and salt
	. "email = '',"
	. "username = '$username',"
	. "password = '$hashedPassword',"
	. "salt = '$salt', "
	. "exp = 0, " 
	. "exp1 = 0, " 
	. "exp2 = 0, " 
	. "exp3 = 0, " 
	. "exp4 = 0");

	$_SESSION["name"] = $username; 

	if ($query) {
		# need this for Ajax on index.php
		echo "true";
	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
?>