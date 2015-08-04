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

	function createSpineImage($ISBN, $title, $author){

		//work still to be done:
		// - extract last name for author
		// - truncate title if needed
		// - auto adjust font size and positioning

		$image = new Imagick();
		$image->newImage(26, 300, new ImagickPixel('black'));
		$image->setImageFormat('png');

		$draw = new ImagickDraw();
		/* Black text */
		$draw->setFillColor('white');

		/* Font properties */
		$draw->setFont('Bookman-DemiItalic');
		$draw->setFontSize( 10 );

		/* Create text */
		$image->annotateImage($draw, 10, 10, 90, $title);

		$image->annotateImage($draw, 10, 200, 90, $author);		

		header('Content-type: image/png');
		$imagePath = '../images/'.$ISBN.'.png';
		$image->writeImage($imagePath);

	}

	function addBook(){

		//process is:
		//1) check if book already exists in database
		//  --> if no, add to Book table
		//2) Add to inventory

		global $slimApp;
		$conn = dbConnect();
		$request = $slimApp->request();
		$body = $request->getBody();
		$input = json_decode($body);
		$ISBN = $input->ISBN;
		$Title = $input->Title;
		$Subtitle = $input->Subtitle;
		$Author = $input->Author;
		$UserID = $_SESSION['UserID']; //this may need to be fixed (login not in place yet)


		$checkQry = $conn->prepare("SELECT BookID FROM Book WHERE ISBN = :ISBN");
		$checkQry->bindParam(":ISBN", $ISBN, PDO::PARAM_STR);
		$checkQry->execute();
		$dataObj = $checkQry->fetch(PDO::FETCH_ASSOC);

		if ($dataObj == false){//Add book to database
			createSpineImage($ISBN,$Title,$Author);
			$Image_Spine = $ISBN.".png";
			$Image_Cover = "cover1.jpg";

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
			$BookID = $pdo->lastInsertId();
		}else{
			$BookID = $dataObj['BookID'];
		}
		//add to inventory
		$inventoryQry = $conn->prepare("INSERT INTO Inventory 
										(BookID, OwnerID, SpecialNotes)
									VALUES 
										(:BookID ,:OwnerID ,:SpecialNotes)");
		//$BookID = 1; //test
		$OwnerID = 1;
		$SpecialNotes = "";
		$inventoryQry->bindParam(":BookID", $BookID, PDO::PARAM_INT);
		$inventoryQry->bindParam(":OwnerID", $OwnerID, PDO::PARAM_INT);
		$inventoryQry->bindParam(":SpecialNotes", $SpecialNotes, PDO::PARAM_STR);
		$inventoryQry->execute();


	}




	$slimApp->run();
?>
