<?php

//Database connection
function dbConnect()
{
	try
	{
		$conn = new PDO('mysql:dbname=roar1827_library;host=localhost', 'roar1827_a', 'oakley');
		//$conn = mysql_connect('localhost', 'roar1827_a', 'oakley');
		//$db_selected = mysql_select_db('roar1827_Recipe', $conn);
		//mysql_select_db('Recipe')or die("cannot select DB");
		//if (!$conn) {
		//   die('Could not connect: ' . mysql_error());
		//}
		//echo 'Connected successfully';
	}
	catch(PDOException $e)
	{
		print '{"error":{"text":'. $e->getMessage() .'}}';
	}
	//$conn = sqlsrv_connect($serverName,$connectionInfo);
	return $conn;
}

function loggedIn(){
	//Set this value to the Session Timeout in Minutes
	/*$sessionTimeOut = 240;
	try
	{
    if (isset($_SESSION['UserID']) && isset($_SESSION['isLoggedIn'])){
        if ($_SESSION['isLoggedIn'] && $_SESSION['UserID'] != 0){
        	//echo "logged in";
			$conn = dbConnect();
			$params = array($_SESSION['UserID'],session_id());
			$query = $conn->prepare("SELECT id, dateDiff(ifNull(login_refresh,login_time),now()) AS duration
			FROM LoginTracking
			WHERE UserId = ? AND session_id LIKE ? AND logout_time is null");
			$query->execute($params);
			$getLoginDuration = $query->fetch(PDO::FETCH_ASSOC);
			if($getLoginDuration){
				if($getLoginDuration['duration'] < $sessionTimeOut){
					$params = array($getLoginDuration['LoginTrackingID']);
					$query = $conn->prepare("UPDATE LoginTracking SET login_refresh = now() WHERE id = ?");
					$query->execute($params);
					return true;
				}else{
					$params = array($getLoginDuration['LoginTrackingID']);
					$query = $conn->prepare("UPDATE LoginTracking SET logout_time = now() WHERE id = ?");
					$query->execute($params);
					$_SESSION['isLoggedIn'] = false;
					$_SESSION['appSessionID'] = 0;//TODO Verify that this is still needed.
					$_SESSION['userID'] = 0;
					$_SESSION['dsn'] = "";
				}
			}
		}
	}
    return false;
	}
	catch(PDOException $e){
		return false;
	}*/
	return true;
}
//function isAdmin(){
//   if (isset($_SESSION['UserID']) && isset($_SESSION['isLoggedIn'])){
//        if ($_SESSION['isLoggedIn'] && $_SESSION['Role']=='Admin')
//            return true;
//    return false;
//    }
//}

/**
*a return object which is used for the data portion of the output from any service.
*/
class rtnObj
{
	/**
	*Constructs a new return object
	*/
    public function __construct()
    {
    	//$this->userObj = new userObj();
        $this->status = -1;
        $this->successStatus = 'Authentication_failed';
        $this->message = 'Invalid Credentials. If you have forgotten your password, you may request a password reminder email by clicking the "Forgot Password" button.';
    	//$this->userObj = null;
    	//$this->roleObj = null;
    	//$this->lastLogin = null;
    }

    public function setMessage($message)
    {
    	$this->message = $message;
    }
   	public function setStatus($status)
    {
    	$this->status = $status;
    }
    public function setSuccessStatus($successStatus)
    {
    	$this->successStatus = $successStatus;
    }
    public function setUser($user)
    {
    	$this->userObj = $user;
    }
    public function setRoleObj($userRole)
    {
    	$this->roleObj = $userRole;
    }
    public function setLastLogin($lastLogin)
    {
    	$this->lastLogin = $lastLogin;
    }
    public function set($key,$value)
    {
        $this->$key = $value;
    }
}

?>