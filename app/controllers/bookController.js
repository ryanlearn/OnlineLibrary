/** Adapt User Controller
*@class UserController
*/
app.controller('bookController', function ($scope, $location, $rootScope, bookService, $q, $timeout) {
	


		var promise = bookService.getMyBooks();
		promise.then(function(value){
			$scope.books = value;

		}, function(reason) {
			$scope.books = reason;
		});
		






});