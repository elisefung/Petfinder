app.controller("NavController", function ($q, $scope, $http, $location, $rootScope) {
    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            $rootScope.currentUser.favorites = user.favorites;
            $rootScope.currentUser.friends = user.friends;
        }
    });

    $scope.logout = function () {
        $http.post("/logout")
            .success(function () {
                $rootScope.currentUser = null;
                $location.url("/");
            });
    }
});