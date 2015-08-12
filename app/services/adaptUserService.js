/** Adapt some Service
*@author Ryan Clements
*@version 1.0
*@since 2013-09-06
*@class adaptUserService
*/

app.service('adaptUserService', function ($resource,$q) {

	/**
	* Updates a given user
	* @method updateUser
	* @param {Number} userName 
	* @param {String} emailAddress 
	* @param {String} firstName 
	* @param {String} lastName 
	* @param {Number} languagePreference 
	* @param {String} title 
	* @param {Number} userID 
	* @return {Promise} resolves to success code
	*/
	this.updateUser = function (userName,emailAddress,firstName,lastName,languagePreference,title,userID) {
		//$user->UserName,$user->EmailAddress,$user->FirstName,$user->LastName,$user->LanguagePreference,$user->Title,$user->UserID
		var user = {'UserName':userName,
					'EmailAddress':emailAddress,
					'FirstName':firstName,
					'LastName':lastName,
					'LanguagePreference':languagePreference,
					'Title':title,
					'UserID':userID};
		var deferred = $q.defer();
		var devSrv = $resource('/api/adaptProfile.php/updateUser',{},{'updateUser': { method: 'POST', isArray: false}});
		var res = devSrv.updateUser({},{user:user},function(){deferred.resolve(res);});
		return deferred.promise;
	};

	this.register = function (firstname,lastname,email,password,passwordMatch) {
		var deferred = $q.defer();
		var devSrv = $resource('/api/index.php/register',{},{'register': { method: 'POST', isArray: false}});
		var res = devSrv.register({},{firstname:firstname,
										lastname:lastname,
										email:email,
										password:password,
										passwordMatch:passwordMatch}
									,function(){
										if (res.status == 0){
											deferred.resolve(res);
										}else{
											deferred.reject(res);
										}
										
									},function(){
										deferred.reject(res);
									});
		return deferred.promise;
	};

	/**
	* Returns a list of users for the my profile page
	* @method getRelatedUsers
	* @return {Promise} resolves [{user}]
	*/
	this.getRelatedUsers = function(){
		var deferred = $q.defer();
		var devSrv = $resource('/api/adaptProfile.php/getUsers',{},{'getUsers': { method: 'GET', isArray: false}});
		var res = devSrv.getUsers({},function(){deferred.resolve(res);});
		return deferred.promise;
	};

	/**
	* Adds a user associated with the current user's customerID
	* @method addUser
	* @param {Number} userName 
	* @param {String} emailAddress 
	* @param {String} firstName 
	* @param {String} lastName 
	* @param {Number} languagePreference 
	* @param {String} title 
	* @return {Promise} resolves to success code
	*/
	this.addUser = function (userName,emailAddress,firstName,lastName,languagePreference,title) {
		var user = {'UserName':userName,
					'EmailAddress':emailAddress,
					'FirstName':firstName,
					'LastName':lastName,
					'LanguagePreference':languagePreference,
					'Title':title};
		var deferred = $q.defer();
		var devSrv = $resource('/api/adaptProfile.php/addUser',{},{'addUser': { method: 'POST', isArray: false}});
		var res = devSrv.addUser({},{user:user},function(){deferred.resolve(res);});
		return deferred.promise;
	};

	/**
	* Update user password
	* @method updatePassword
	* @param {Number} userID The user to update password for
	* @param {String} oldPassword
	* @param {String} newPassword
	* @return {Promise} resolves to success code
	*/
	this.updatePassword = function (userID,oldPassword,newPassword) {
		var deferred = $q.defer();
		var devSrv = $resource('/api/adaptProfile.php/updateUserPassword',{userID:userID,OldPassword:oldPassword,NewPassword:newPassword},{'updateUserPassword': { method: 'POST', isArray: false}});
		var res = devSrv.updateUserPassword({},{UserID:userID,OldPassword:oldPassword,NewPassword:newPassword},function(){deferred.resolve(res);});
		return deferred.promise;
	};

	/**
	* Deletes the given user
	* @method deleteUser
	* @param {Number} userID The user to delete
	* @return {Promise} resolves to success code
	*/
	this.deleteUser= function (userID) {
		var deferred = $q.defer();
		var devSrv = $resource('/api/adaptProfile.php/deleteUser',{userID:userID},{'deleteUser': { method: 'POST', isArray: false}});
		var res = devSrv.deleteUser({},{userID:userID},function(){deferred.resolve(res);});
		return deferred.promise;
	};

});
