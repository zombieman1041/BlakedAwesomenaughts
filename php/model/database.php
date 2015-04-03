<?php
class Database { //class Database is more efficient because instead of using different functions we can just use class database so all the functions we've been using are all in one class. This is an instance of a new object
	private $connection; //following variables are set to private so they wont be modified by other files
	private $host;
	private $username;
	private $password;
	private $database;
	public 	$error;

	public function __construct($host, $username, $password, $database) {		// The construct function is used so that whatever is in this function it will create an object for each variable
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

		$this->connection = new mysqli($host, $username, $password); //used to access the database on the sqli server
		if($this->connection->connect_error){						// checks to see if the connection has an error
			die("Error: " . $this->connection->connect_error);	// if there is an error the program will die
		}
		$exists = $this->connection->select_db($database); 		//selects the database and checks if it exists
		if (!$exists) {										
			$query = $this->connection->query("CREATE DATABASE $database"); //creates a database by query called blog_db NOTE: action words are in uppercase
			if ($query) {											//outputs a statement that the query was true
				echo "Successfully created database: " . $database;
			}
		}
		// else {												// Outputs that the database already exists
		// 	echo "database already exists.";
		// }	
	}
	// This function within our class is used to open connections. Functions are used to cause actions within our class
	public function openConnection(){
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database); //used to access the database on the sqli server

		if($this->connection->connect_error){						// checks to see if the connection has an error
			die("Error: " . $this->connection->connect_error);	// if there is an error the program will die
		}
	}
	public function closeConnection(){//This function is used to close connections 
		if (isset($this->connection)) { //isset checks to see if theres any information is in the variable
			# code...
			$this->connection->close(); //closes connection 
		}
	} //this function is used to request
	public function query($string){	
		$this->openConnection();

		$query = $this->connection->query($string); //creates a table by query with a title using the var title and a post with a var post

		if (!$query) {
			# code...
			$this->error = $this->connection->error;
		}

		$this->closeConnection();

		return $query;
	}
}

