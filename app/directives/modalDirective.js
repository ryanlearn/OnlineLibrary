app.factory("sharedService",["$q", "$modal", function ($q, $modal)
{
    var _showConfirmDialog = function (title, message)
    {
        var defer = $q.defer();

        var modalInstance = $modal.open({
            animation: true,
            size: "sm",
            templateUrl: '/app/templates/bookDetail.html',
            controller: function ($scope, $modalInstance)
            {
                $scope.title = title;
                $scope.message = message;

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

        showConfirmDialog: _showConfirmDialog
    };
}]);
