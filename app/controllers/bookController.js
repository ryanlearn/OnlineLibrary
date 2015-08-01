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

	
		$scope.lookupBook = function(ISBN){
			var promise = bookService.lookupBook(ISBN);
			promise.then(function(value){
				$scope.lookupBookRes = value;

			}, function(reason) {
				$scope.lookupBookRes = reason;
			});

		};
		






});