app.factory("sharedService",["$q", "$modal", function ($q, $modal)
{
    var _showConfirmDialog = function (title, message)
    {
        var defer = $q.defer();

        var modalInstance = $modal.open({
            animation: true,
            size: "lg",
            templateUrl: '/app/templates/bookDetail.html',
            controller: function ($scope, $modalInstance)
            {
                $scope.title = title;
                $scope.message = message;
                $scope.range = new Array(5);

                $scope.starRating = parseInt(message.StarRating);
                $scope.rated = 1;
                if ($scope.starRating == 0){
                    $scope.rated = 0;
                }
                $scope.emptyStarRating = 5-parseInt(message.StarRating);
                $scope.ok = function ()
                {
                    modalInstance.close();
                    defer.resolve();
                };

                $scope.cancel = function ()
                {
                    $modalInstance.dismiss();
                    defer.reject();
                };
            }
        });

        return defer.promise;
    }

    var _showRegisterDialog = function (title, message)
    {
        var defer = $q.defer();

        var modalInstance = $modal.open({
            animation: true,
            size: "lg",
            templateUrl: '/app/templates/modal.html',
            controller: function ($scope, $modalInstance)
            {
                $scope.ok = function ()
                {
                    modalInstance.close();
                    defer.resolve();
                };

                $scope.cancel = function ()
                {
                    $modalInstance.dismiss();
                    defer.reject();
                };
            }
        });

        return defer.promise;
    }

    var _showAddBookDialog = function (title, message)
    {
        var defer = $q.defer();

        var modalInstance = $modal.open({
            animation: true,
            size: "sm",
            templateUrl: '/app/templates/addBook.html',
            controller: function ($scope, $modalInstance)
            {

                $scope.ok = function ()
                {
                    modalInstance.close();
                    defer.resolve();
                };

                $scope.cancel = function ()
                {
                    $modalInstance.dismiss();
                    defer.reject();
                };
            }
        });

        return defer.promise;
    }

    return {

        showConfirmDialog: _showConfirmDialog,
        showRegisterDialog: _showRegisterDialog,
        showAddBookDialog: _showAddBookDialog
    };
}]);

