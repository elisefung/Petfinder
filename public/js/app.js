var app = angular.module('PetfinderApp', ['ngRoute']);

// Configure Routing
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/search/search.html',
        controller: 'SearchController'
    }).
    when('/pets', {
        templateUrl: 'views/pet/pet.html',
        controller: 'PetController'
    }).
    when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileController'
    }).
    when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginController'
    }).
    when('/signup', {
        templateUrl: 'views/signup/signup.html',
        controller: 'SignupController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

// Pet Search Factory
//app.factory('PetSearch', function PetSearch($http) {
//
//    // array of pet IDs
//    var favorites = [];
//
//    // add the given pet to the list of favorites
//    var addToFavorites = function (pet) {
//        favorites.push(pet);
//    };
//
//    // remove the given pet from the list of favorites
//    var removeFromFavorites = function (pet) {
//        var index = favorites.indexOf(pet);
//        favorites.splice(index, 1);
//    };
//
//    // return list of favorite pets
//    var getFavorites = function () {
//        return favorites;
//    };
//
//});

// API data
var apikey = "5ac1149d1668e6e3cfb18d3556ef8d79";
var apisig = "59b0c48e2afad3c8bba73b5659bf4a8d";
var baseUrl = "http://api.petfinder.com/";