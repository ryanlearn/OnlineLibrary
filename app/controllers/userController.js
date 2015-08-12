/** Adapt User Controller
*@class UserController
*/
app.controller('UserController', function ($scope, $location, $rootScope, adaptUserService, loginService, $q, $timeout, sharedService, $window) {
	

	$scope.showLoginMessage = 0;

    $scope.closeAlert = function ()
    {
    	$scope.showLoginMessage = 0;
    };

	var doLogin = function(value) {
		console.log('doLogin()');

		$scope.userObj = value.userObj;
		$scope.isLoggedIn = true;

		$scope.welcome = value.userObj.firstName + " " + value.userObj.lastName;
		//$location.url('/');
	};

    $scope.showRegister = function ()
    {
        sharedService.showRegisterDialog(
            "test",
            "test2")
            .then(function ()
            {
                $window.location = '#/';
            },
            function ()
            {
            });
    };	




    init();
	/**
	Makes a call to sessionInit() to initialize the data model(loginService.js)
	@method init
	@return
	Sets: $scope.userObj, $scope.isLoggedIn, $scope.welcome, $scope.roleObj, $scope.notes, $scope.navItems
	*/
	function init() {
		console.log('init()');

		$scope.isLoggedIn = false;
		$scope.welcome = "Not Logged In";
		var promise = loginService.sessionInit();
		//var initRes = loginService.sessionInit();
		promise.then(function(value){

		}, function(reason) {
			$location.url('/');
		});

	}

	$scope.strToDate = function(str) {
		return (new Date(str));
	};

	/**
	*
	*/

	$scope.loggedIn = function() {
		console.log('$scope.loggedIn()');
		return loginService.loggedIn();
	};

	$scope.getLoggedInStatus = function() {
		console.log('$scope.getLoggedInStatus()');
		$scope.isLoggedIn = loginService.loggedIn();
	};

	$scope.login = function(username,password) {
		console.log('$scope.login()');
		//call loginService here

		if ($scope.isLoggedIn) {

			//$location.url('/home/');

			return;
		}

		//initially replies with empty res, then replies with data when the get request returns
		var promise = loginService.login(username,password);
		promise.then(function(value){
			$scope.promise = value;
			if (value.message == "Login Successful"){
				doLogin(value);

				$location.url('/home/');

			}
		}, function(reason) {
			$scope.showLoginMessage = 1;
			$scope.loginMessage = reason.message;
		});

	};

	$scope.logout = function() {
		console.log('$scope.logout()');
		//call loginService here
		loginService.logout()
		.then(function(res) {
			window.location.href = '/';
		});
	};
	//notes model


	$scope.getClass = function (path) {
		console.log('$scope.getClass("'+path+'")');
        if ($location.path().substr(0, path.length) == path) {
            return true;
        } else {
            return false;
        }
    };

    /*$scope.loginViewInit = function() {
		console.log('$scope.loginViewInit()');
		if ($scope.isLoggedIn) {

			$location.url('/home/');

		}
    };*/


});