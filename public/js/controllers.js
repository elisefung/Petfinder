// for main navigation
app.controller('NavController', function ($scope) {});

// for main search filters 
app.controller('SearchController', function ($scope, $http) {
    $scope.query = {
        type: 'all'
    };
});

// for pet listing on home page
app.controller('ListController', function ($scope, $http) {

    $http.get("/api/pets")
        .success(function (response) {
            $scope.petList = response;
        });

});

// for individual pet profile
app.controller('PetController', function ($scope, $http) {
    $scope.hello = "Hello World from Pet Controller!";
});

// for current user's profile
app.controller('ProfileController', function ($scope, $http) {
    $scope.hello = "Hello World from Profile Controller!";
});

// for login page
app.controller('LoginController', function ($scope, $http) {
    $scope.hello = "Hello World from Login Controller!";
});

// for sign up page
app.controller('SignupController', function ($scope, $http) {
    $scope.hello = "Hello World from Signup Controller!";
});