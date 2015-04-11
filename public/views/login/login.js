app.controller('LoginController', function ($scope, $http, $location, $rootScope) {
    $scope.hello = "Hello World from Login Controller!";

    $scope.login = function (user) {
        console.log(user);
        $http.post("/login", user)
            .success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;
                $location.url("/profile");
            });
    }
});