<?php
	require_once(__DIR__ . "/database.php"); // brings info from config.php to this file and concatentates the directory from here
 	session_start();
 	session_regenerate_id(true); //everytime it is called it regenerates the id and uses the original session and creates a new session

 	//creates a path to /blog/
	$path = "/Awesomenaughts/php/";
	// variables below enables our database to connect to the server
	$host = "localhost";	
	$username = "root";
	$password = "root";
	$database = "awesomenaughts_db";

	if (!isset($_SESSION["connection"])) {
		# code...
		//creates a database object
			$connection = new Database($host, $username, $password, $database);
			$_SESSION["connection"] = $connection;
	}

?>