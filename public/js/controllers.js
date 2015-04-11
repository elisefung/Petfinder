// for main search filters 
//app.controller('SearchController', function ($scope, $http) {
//    $scope.query = {
//        type: 'all'
//    };
//
//});

// for pet listing on home page
//app.controller('ListController', function ($scope, $http) {
//
//    $http.get("/api/pets")
//        .success(function (response) {
//            $scope.petList = response;
//        });
//
//});

// for individual pet profile
app.controller('PetController', function ($scope, $http) {
    $scope.hello = "Hello World from Pet Controller!";
});