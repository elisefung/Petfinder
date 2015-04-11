app.controller("NavController", function ($scope, $http, $location, $rootScope) {
    $scope.logout = function () {
        $http.post("/logout")
            .success(function () {
                $rootScope.currentUser = null;
                $location.url("/");
            });
    }
});