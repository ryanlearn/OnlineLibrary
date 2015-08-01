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
	$slimApp->get('/lookupBook/:id', 'lookupBook');

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


	function lookupBook($id){
		defined('AWS_API_KEY') or define('AWS_API_KEY', 'AKIAJ3WKL6FNDRODBOOA');
		defined('AWS_API_SECRET_KEY') or define('AWS_API_SECRET_KEY', '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');
		defined('AWS_ASSOCIATE_TAG') or define('AWS_ASSOCIATE_TAG', 'clemeventu-20');

		require 'AmazonECS.class.php';

		try
		{
		    $amazonEcs = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'CA', AWS_ASSOCIATE_TAG);
		    $response = $amazonEcs->responseGroup('Large')->lookup($id);
		    //echo $id;
		    echo json_encode($response);
		}
		catch(Exception $e)
		{
		  echo $e->getMessage();
		}
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
