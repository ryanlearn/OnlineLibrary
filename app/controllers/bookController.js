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
				$scope.BookAuthor = lookupBookRes.Items.Item.ItemAttributes.Author;
				$scope.Title = lookupBookRes.Items.Item.ItemAttributes.Title;
				$scope.Subtitle = "test";
				$scope.ISBN = "1234";

			}, function(reason) {
				$scope.lookupBookRes = reason;
			});

		};


		$scope.addBook = function(ISBN, Title, Subtitle, Author){
			var promise = bookService.addBook(ISBN,Title,Subtitle,Author);
			promise.then(function(value){
				$scope.addBookRes = value;

			}, function(reason) {
				$scope.addBookRes = reason;
			});

		};
		






});