<?php
	session_start();

	require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	$slimApp = new \Slim\Slim();

	include "util.php"; //dbConnect and other helper functions

	//All resources must be defined here. (http://docs.slimframework.com/#GET-Routes)
	//for an Angular service to call this function create $resource for path /api/adaptSeed.php/example_path
	$slimApp->get('/db', 'db');
	$slimApp->get('/getMyBooks', 'getMyBooks');

	function db(){
		//echo "working";
		$conn = dbConnect();
		//$query="SELECT * FROM Accounts";
		//$result=mysql_query($query);

		//if (!$result) {
		//    $message  = 'Invalid query: ' . mysql_error() . "</br>";
		//    $message .= 'Whole query: ' . $query;
		//    die($message);
		//}

		//while ($row = mysql_fetch_assoc($result)) {
		//    echo $row['FirstName'];

		//}
		//$usersObj = mysqli_fetch_all($result);

		//echo json_encode($usersObj);
 		$params = array(10);
 		$query = $conn->prepare("SELECT FirstName FROM Accounts WHERE UserID < ?"); //?'s' will be replaced by $params above
 		$query->execute($params);
 		$dataObj = $query->fetchAll(PDO::FETCH_ASSOC); //fetch_assoc will return key/value pairs ideal for json output
 		echo json_encode($dataObj); //reply with JSON object
	}

	function getMyBooks(){
		if (loggedIn()){
			$conn = dbConnect();
			$params = array(); //$_SESSION['UserID']
			$query = $conn->prepare("SELECT Book.*
										FROM Inventory
										INNER JOIN Book
										ON Inventory.BookID=Book.BookID
										WHERE Inventory.OwnerID = 1");
			$query->execute($params);
			$dataObj = $query->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($dataObj);

		}
	}

	$slimApp->run();
?>
