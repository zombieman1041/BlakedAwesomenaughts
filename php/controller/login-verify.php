<?php
	require_once(__DIR__ . "/../model/config.php");//executes file from here and concatentates the directory from here

	function authenticateUser() {
		if(!isset($_SESSION["authenticated"])) {
			# code...
			return false;
		}
		else{
			if ($_SESSION["authenticated"] != true) {
				# code...
				return false;
			}
			else{
				return true;
			}
		}
	}