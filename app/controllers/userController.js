/** Adapt User Controller
*@class UserController
*/
app.controller('UserController', function ($scope, $location, $rootScope, loginService, $q, $timeout) {
	
	var doLogin = function(value) {
		console.log('doLogin()');

		$scope.userObj = value.userObj;
		$scope.isLoggedIn = true;

		$scope.welcome = value.userObj.firstName + " " + value.userObj.lastName;
		//$location.url('/');
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
			$scope.promise = reason;
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


    var getNav = function() {
		console.log('getNav()');
		
		//$scope.navItems = loginService.getNav();
		if ($scope.userObj.roleId == 1 && $scope.userObj.languagePreference == 0){
			$scope.navItems = [
				{ title: 'Home', path: '/home/' },
				{ title: 'About', path: '/about/' },
				{ title: 'Forecast', path: '/forecast/' },
				{ title: 'Transactions', path: '/transactions/' },
				{ title: 'Contacts', path: '/contact/' },
				{ title: 'Resources', path: '/resources/' }
			];
		}else if ($scope.userObj.roleId == 1 && $scope.userObj.languagePreference == 1){
			$scope.navItems = [
				{ title: 'French', path: '/home/' },
				{ title: 'French', path: '/about/' },
				{ title: 'French', path: '/forecast/' },
				{ title: 'French', path: '/transactions/' },
				{ title: 'French', path: '/contact/' },
				{ title: 'French', path: '/resources/' }
			];
		}else if($scope.userObj.roleId == 2){
			$scope.navItems = [
				{ title: 'Home', path: '/admin-home/' },
				{ title: 'Reports', path: '/admin-reports/' },
				{ title: 'Resources', path: '/resources/' },
				{ title: 'Contacts', path: '/contact/' },
				{ title: 'About', path: '/about/' },
			];
		}else if($scope.userObj.roleId == 3){
			$scope.navItems = [
				{ title: 'Home', path: '/rep-home/' },
				{ title: 'Reports', path: '/rep-reports/' },
				{ title: 'Resources', path: '/rep-resources/' }
			];
		}
    };

});