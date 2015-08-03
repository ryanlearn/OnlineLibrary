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
	$slimApp->get('/testRest', 'testRest');

	function CallAPI($method, $url, $data = false)
	{
	    $curl = curl_init();

	    switch ($method)
	    {
	        case "POST":
	            curl_setopt($curl, CURLOPT_POST, 1);

	            if ($data)
	                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	            break;
	        case "PUT":
	            curl_setopt($curl, CURLOPT_PUT, 1);
	            break;
	        default:
	            if ($data)
	                $url = sprintf("%s?%s", $url, http_build_query($data));
	    }

	    // Optional Authentication:
	    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	    curl_setopt($curl, CURLOPT_USERPWD, "username:password");

	    curl_setopt($curl, CURLOPT_URL, $url);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	    $result = curl_exec($curl);

	    curl_close($curl);

	    return $result;
	}

	function testRest(){
			$testRest = CallAPI("GET","http://isbndb.com/api/v2/json/4UYZ2W9Z/book/0399530649");
			echo $testRest;
	}


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

		try
		{

		    $ISBN = (string)$ISBN;
		    $URL = "http://isbndb.com/api/v2/json/4UYZ2W9Z/book/".$ISBN;
		    $response = CallAPI("GET",$URL);
		    echo $response;
		    //echo json_encode($response);
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
