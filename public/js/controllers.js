app.controller('NavController', function ($scope) {});

app.controller('SearchController', function ($scope, $http) {
    $scope.hello = "Hello World from Search Controller!";
});

app.controller('PetController', function ($scope, $http) {
    $scope.hello = "Hello World from Pet Controller!";
});

app.controller('ProfileController', function ($scope, $http) {
    $scope.hello = "Hello World from Profile Controller!";
});

app.controller('LoginController', function ($scope, $http) {
    $scope.hello = "Hello World from Login Controller!";
});

app.controller('SignupController', function ($scope, $http) {
    $scope.hello = "Hello World from Signup Controller!";
});