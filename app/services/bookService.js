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

});