<?php
	require_once(__DIR__ . "/../model/config.php"); // brings info from config.php to this file and concatentates the directory from here



	$query = $_SESSION["connection"]->query("CREATE TABLE users ("  //creates a table by query

	. "id int(11) NOT NULL AUTO_INCREMENT,"				// creates unique ids for the server and cannot be empty and handles the ids for us 
	. "username varchar(30) NOT NULL,"					// creates a collumn for a username with a max length of 30 characters and it cant be empty
	. "email varchar(50) NOT NULL,"						// creates a collumn for a email with a max length of 50 characters and it cant be empty
	. "password char(128) NOT NULL,"					// creates a collumn for a password with a max length of 128 characters and it cant be empty
	. "salt char(128) NOT NULL,"						//creates a security against hackers that cant be empty
	. "exp int(4),"
	. "exp1 int(4),"
	. "exp2 int(4),"
	. "exp3 int(4),"
	. "exp4 int(4),"
	. "PRIMARY KEY(id))");								// allows the tables to be connected and is shown that it is connected by an id
	
	if($query){
		echo "true";
	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
?>
