app.controller('SignupController', function ($scope, $http, $location, $rootScope) {

    $scope.message = "Already have an account? "

    $scope.signup = function (user) {
        console.log(user);

        $http.post("/signup", user)
            .success(function (response) {
                console.log(response);
                if (response != null) {
                    $rootScope.currentUser = response;
                    $location.url("/user");
                } else {
                    $scope.message = "Oops, it looks like you already have an account. ";
                }
            });
    }
});