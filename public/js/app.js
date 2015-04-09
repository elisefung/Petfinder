var app = angular.module('PetfinderApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchController'
    }).
    when('/pets/:petID', {
        templateUrl: 'views/pet.html',
        controller: 'PetController'
    }).
    when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

app.controller('SearchController', function ($scope, $http) {
    $scope.hello = "Hello World from Search Controller!";
});

app.controller('PetController', function ($scope, $http) {
    $scope.hello = "Hello World from Pet Controller!";
});

app.controller('ProfileController', function ($scope, $http) {
    $scope.hello = "Hello World from Profile Controller!";
});