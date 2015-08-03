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
	$slimApp->post('/lookupBook', function(){lookupBook();});
	$slimApp->post('/addBook', function(){addBook();});

	function db(){
		$conn = dbConnect();

		//echo json_encode($usersObj);
 		$params = array(10);
 		$query = $conn->prepare("SELECT FirstName FROM Accounts WHERE UserID < ?"); //?'s' will be replaced by $params above
 		$query->execute($params);
 		$dataObj = $query->fetchAll(PDO::FETCH_ASSOC); //fetch_assoc will return key/value pairs ideal for json output
 		echo json_encode($dataObj); //reply with JSON object
	}


	function lookupBook(){

		global $slimApp;
		$conn = dbConnect();
		$request = $slimApp->request();
		$body = $request->getBody();
		$input = json_decode($body);
		$ISBN = $input->ISBN;

		defined('AWS_API_KEY') or define('AWS_API_KEY', 'AKIAJ3WKL6FNDRODBOOA');
		defined('AWS_API_SECRET_KEY') or define('AWS_API_SECRET_KEY', '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');
		defined('AWS_ASSOCIATE_TAG') or define('AWS_ASSOCIATE_TAG', 'clemeventu-20');

		require 'AmazonECS.class.php';

		try
		{
		    $amazonEcs = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'CA', AWS_ASSOCIATE_TAG);
		    $ISBN = (string)$ISBN;
//->optionalParameters(array('IdType' => 'ISBN'))
		    $response = $amazonEcs->responseGroup('Large')->lookup($ISBN);
		    
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

	function addBook(){

		global $slimApp;
		$conn = dbConnect();
		$request = $slimApp->request();
		$body = $request->getBody();
		$input = json_decode($body);
		$ISBN = $input->ISBN;
		$Title = $input->Title;
		$Subtitle = $input->Subtitle;
		$Author = $input->Author;

		$Image_Spine = "spine1.jpg";
		$Image_Cover = "cover1.jpg";
		$UserID = $_SESSION['UserID']; //this may need to be fixed (login not in place yet)

		$query = $conn->prepare("INSERT INTO Book 
									(Title, Subtitle, Author, ISBN, Image_Spine, Image_Cover)
								VALUES 
									(:Title ,:Subtitle ,:Author, :ISBN, :Image_Spine, :Image_Cover)");

		$query->bindParam(":Title", $Title, PDO::PARAM_STR);
		$query->bindParam(":Subtitle", $Subtitle, PDO::PARAM_STR);
		$query->bindParam(":Author", $Author, PDO::PARAM_STR);
		$query->bindParam(":ISBN", $ISBN, PDO::PARAM_STR);
		$query->bindParam(":Image_Spine", $Image_Spine, PDO::PARAM_STR);
		$query->bindParam(":Image_Cover", $Image_Cover, PDO::PARAM_STR);
		$query->execute();


	}

	$slimApp->run();
?>
