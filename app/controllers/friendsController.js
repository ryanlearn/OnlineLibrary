/** Friends Controller
*@class FriendsController
*/
app.controller('friendsController', function ($scope, bookService, $q, sharedService, $window) {
	


	$scope.findFriends = function ()
	{
		var promise = bookService.findFriends();
		promise.then(function(value){
			$scope.findFriends = value.nonFriends;
			$scope.friends = value.friends;

		}, function(reason) {
			$scope.findFriends = reason;
			$scope.friends = reason;
		});
	};

	$scope.addFriend = function (UserID)
	{
		var promise = bookService.addFriend(UserID);
		promise.then(function(value){
			$scope.addFriendResult = value;

		}, function(reason) {
			$scope.addFriendResult = reason;
		});
	};

	$scope.viewFriend = function (UserID)
	{
		console.log("test");
	};

	$scope.removeFromList = function (index)
	{
		//remove index from $scope.findFriends
		var friend = $scope.findFriends.splice(index,1);

		//add to friends array
		console.dir(friend);
		$scope.friends.push(friend[0]);
	}

	$scope.findFriends();



});
