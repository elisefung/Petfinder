var app = angular.module('PetfinderApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchController'
    }).
    when('/pets', {
        templateUrl: 'views/pet.html',
        controller: 'PetController'
    }).
    when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    }).
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    }).
    when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);