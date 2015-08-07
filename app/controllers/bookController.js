/** Adapt User Controller
*@class UserController
*/
app.controller('bookController', function ($scope, $location, $rootScope, bookService, $q, $timeout, sharedService, $window) {
	
$scope.testpass = "asdf";
$scope.showBorrowed = "false";
$scope.searchBooks   = ''; 
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
				//$scope.author = lookupBookRes.data[0].author_data[0].name;
				//$scope.ISBN = lookupBookRes.data[0].isbn13;
				//$scope.bookTitle = lookupBookRes.data[0].title;

			}, function(reason) {
				$scope.lookupBookRes = reason;
			});

		};


		$scope.addBook = function(){
			$scope.testpass = $scope.bookTitle;
			var promise = bookService.addBook($scope.lookupBookRes.data[0].isbn13,
												$scope.lookupBookRes.data[0].title,
												"No Subtitle",
												$scope.lookupBookRes.data[0].author_data[0].name);
			promise.then(function(value){
				$scope.addBookRes = value;

			}, function(reason) {
				$scope.addBookRes = reason;
			});

		};


	    $scope.showConfirm = function (abook)
	    {
	        sharedService.showConfirmDialog(
	            abook.Title,
	            abook)
	            .then(function ()
	            {
	                $window.location = '#/home';
	            },
	            function ()
	            {
	            });
	    };	

	    $scope.borrowBook = function (emailBorrow)
	    {
	    	//need to check email address here, call some api function, then decide what alert to show
	        if (emailBorrow != null){
	        	$scope.showBorrowed = 1;
	        	$scope.showNoEmail = 0;
	        }
	        else{
	        	$scope.showNoEmail = 1;
	        }

	    };	

	    $scope.closeAlert = function ()
	    {
	    	$scope.showBorrowed = 0;
	    	$scope.showNoEmail = 0;
	    };






});