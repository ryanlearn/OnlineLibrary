/** Adapt User Controller
*@class UserController
*/
app.controller('bookController', function ($scope, $location, $rootScope, adaptUserService, bookService, $q, $timeout, sharedService, $window) {
	
$scope.testpass = "asdf";
$scope.showBorrowed = "false";
$scope.searchBooks   = ''; 
$scope.showRegistrationAlert = 0;
$scope.showBookSearchError = 0;

		var promise = bookService.getMyBooks();
		promise.then(function(value){
			$scope.books = value;

		}, function(reason) {
			$scope.books = reason;
		});

	$scope.getMyBooks = function ()
	{
		var promise = bookService.getMyBooks();
		promise.then(function(value){
			$scope.books = value;

		}, function(reason) {
			$scope.books = reason;
		});
	};


	$scope.getPopularBooks = function ()
	{
		var promise = bookService.getPopularBooks();
		promise.then(function(value){
			$scope.popularBooks = value;

		}, function(reason) {
			$scope.popularBooks = reason;
		});
	};

$scope.getPopularBooks();


    $scope.register = function (firstname,lastname,email,password,passwordMatch)
    {
    	console.log("register pressed");
		var promise = adaptUserService.register(firstname,lastname,email,password,passwordMatch);
		//var initRes = loginService.sessionInit();
		promise.then(function(value){
			$scope.cancel();
			$location.url('/home');
		}, function(reason) {
			$scope.registrationError = reason.message;
			$scope.showRegistrationAlert = 1;
		});

    };
	
		$scope.lookupBook = function(ISBN){
			var promise = bookService.lookupBook(ISBN);
			promise.then(function(value){
				$scope.lookupBookRes = value;
				$scope.author = value.data[0].author_data[0].name;
				$scope.ISBN = value.data[0].isbn13;
				$scope.bookTitle = value.data[0].title;

			}, function(reason) {
				$scope.lookupBookRes = reason.error;
				$scope.showBookSearchError = 1;
			});

		};


		$scope.addBook = function(bookTitle, author, isbn){

			var promise = bookService.addBook(isbn, bookTitle, "No Subtitle", author);
			promise.then(function(value){
				$scope.addBookRes = value;
				$scope.cancel();
				$scope.getMyBooks();

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

	    $scope.showAddBook = function ()
	    {
	        sharedService.showAddBookDialog(
	            "",
	            "")
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
	    	$scope.showRegistrationAlert = 0;
	    	$scope.showBookSearchError = 0;
	    };






});