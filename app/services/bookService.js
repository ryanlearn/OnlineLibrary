/**
@module Services
*/
/** Adapt Login Service
*@class bookService
*@author Ryan Clements 
*@version 1.0
*@since 2015-06-08
*/
app.service('bookService', function ($resource, $q) {

	/**
	Initializes user session
	@method sessionInit
	@return Returns a rtnObj
	**/
	/*this.sessionInit = function () {
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
	}*/

	/**
	* Returns a list of books for a given user
	* @method getMyBooks
	* @return {Promise} resolves [{Book}]
	*/
	this.getMyBooks = function(){
		var deferred = $q.defer();
		var devSrv = $resource('/api/index.php/getMyBooks',{},{'getMyBooks': { method: 'GET', isArray: true}});
		var res = devSrv.getMyBooks({},function(){deferred.resolve(res);});
		return deferred.promise;
	};

	/**
	* Returns a list of books for a given user
	* @method lookupBook
	* @return {Promise} resolves [{Book}]
	*/
	this.lookupBook = function (ISBN) {
		var deferred = $q.defer();
		var devSrv = $resource('/api/index.php/lookupBook/',{},{'lookupBook': { method: 'POST', isArray: false}});
		var res = devSrv.lookupBook({},{
			ISBN: ISBN
		},function(){
			if (res.status == 0) {
				deferred.resolve(res);
			} else {
				deferred.reject(res);
			}
		},function(){
			deferred.reject(res);
		});
		return deferred.promise;
	};

});