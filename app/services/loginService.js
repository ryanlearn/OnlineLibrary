/**
@module Services
*/
/** Adapt Login Service
*@class loginService
*@author Ryan Clements (Innovasium)
*@version 1.0
*@since 2013-06-26
*/
app.service('loginService', function ($resource, $q) {

	var userObj = [];
	var roleObj = [];
	var navObj = [];
	var isInit = false;

	/**
	*@method getUser
	*@return {JSON} Returns the User object from the model
	*/
	this.getUser = function (){
		return userObj;
	};

	/**
	*@method getRole
	*@return {JSON} Returns the Role object for the current User
	*/
	this.getRole = function (){
		return roleObj;
	};

	/**
	*@method getNav
	*@return {JSON} Returns the Navigation object based on the current User's role
	*/
	this.getNav = function (){
		return navObj;
	};

	/**private function used to build the navigation bar link must add new navigation items to app.js as well for routing
	* DO NOT CALL FROM CONTROLLER
	* @return Returns the Navigation object based on the current User's role
	*/
	this.createNavBar = function(roleObj){
		navObj = [];
		navObj.push({title:"Home",path:"/home"});
		return navObj;
	};

	/**
	Request login
	@method login
	@return Returns a rtnObj
	**/
    this.login = function (username,password) {
    	var deferred = $q.defer();
		//need to change this to interpret the result, save to the model, and return what is needed for scope

		var userSrv = $resource('/api/login.php/login',{},{'login': { method: 'POST', isArray: false}});
		var res = userSrv.login({},{username:username,password:password},function(){
			//res.test = true;
			//process return object
			if (res.status == 0){

				userObj = res.userObj;
				roleObj = res.roleobj;
				isInit = true;
				//navObj = this.createNavBar(res.roleObj);
				//
			} else {
				userObj = [];
				roleObj = [];
				navObj = [];
				deferred.reject(res);
			}
			deferred.resolve(res);
			//return res;
		},function(){
			deferred.reject(res);
		});
		//return res;
		return deferred.promise;
    };

	/**
	Resets session variables and logs user out
	@method logout
	@return Returns a Promise that resolves to the response information
	**/
	this.logout = function () {
		var deferred = $q.defer();
		var userSrv = $resource('/api/login.php/logout',{},{'logout': { method: 'GET', isArray: false}});
		var res = userSrv.logout({},function(){
			deferred.resolve(res);
		}, function() {
			deferred.reject(res);
		});
		return deferred.promise;
    };

	/**
	*@method loggedIn
	*@return Returns if the user is currently logged in or not
	*/
	this.loggedIn = function () {
			if (userObj != null){
				return true;
			}
			return false;
    };

	/**
	Initializes user session
	@method sessionInit
	@return Returns a rtnObj
	**/
	this.sessionInit = function () {
		var deferred = $q.defer();
		var userSrv = $resource('/api/login.php/sessionInit',{},{'sessionInit': { method: 'GET', isArray: false}});
		var res = userSrv.sessionInit({},function(){
			if (res.status == 0){
				//notes = res.NOTIFICATIONARRAY;
				userObj = res.userObj;
				roleObj = res.roleobj;
				isInit = true;
				//navObj = this.createNavBar(res.roleObj);
				deferred.resolve(res);
			} else {
				deferred.reject(res);
			}
		},function(){
			deferred.reject(res);
		});
		return deferred.promise;
	}

});