app.controller('SignupController', function ($scope, $http, $location, $rootScope) {

    $scope.signup = function (user) {
        console.log(user);

        $http.post("/signup", user)
            .success(function (response) {
                console.log(response);
                if (response != null) {
                    $rootScope.currentUser = response;
                    $location.url("/profile");
                } else {
                    $scope.message = "Oops, it looks like you already have an account";
                }
            });
    }
});