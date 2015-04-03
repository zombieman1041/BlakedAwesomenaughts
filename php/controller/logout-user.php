<?php
	require_once(__DIR__ . "/../model/config.php");//executes file from here and concatentates the directory from here

	unset($_SESSION["authenticated"]);

	session_destroy();
	header("Location: " . $path . "index.php");