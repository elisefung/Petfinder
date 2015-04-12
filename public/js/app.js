var app = angular.module('PetfinderApp', ['ngRoute']);

// Configure Routing
app.config(['$routeProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/search/search.html',
        controller: 'SearchController'
    }).
    when('/pet/:id', {
        templateUrl: 'views/pet/pet.html',
        controller: 'PetController'
    }).
    when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileController',
        resolve: {
            loggedin: checkLoggedin
        }
    }).
    when('/profile/:id', {
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
            $rootScope.currentUser.favorites = user.favorites;
            $rootScope.currentUser.friends = user.friends;
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

// API data
var apikey = "5ac1149d1668e6e3cfb18d3556ef8d79";
var apisig = "59b0c48e2afad3c8bba73b5659bf4a8d";
var baseUrl = "http://api.petfinder.com/";

// Pet Search Factory
app.factory('PetSearch', function PetSearch($http, $rootScope) {
    var user = $rootScope.currentUser;
    console.log('currentuser: ' + user);
    // array of pet IDs
    var favorites = [];

    // add the given pet to the list of favorites
    var addToFavorites = function (pet) {
        favorites.push(pet);
    };

    // remove the given pet from the list of favorites
    var removeFromFavorites = function (pet) {
        var index = favorites.indexOf(pet);
        favorites.splice(index, 1);
    };

    // return list of favorite pets
    var getFavorites = function () {
        return favorites;
    };

    // get(id)
    // search(queries)

    // main search with filters
    var searchForPets = function (query, callback) {
        var animal = query.animal;
        var location = query.location;
        var breed = query.breed;
        var age = query.age;
        var gender = query.gender;
        var apiUrl = 'http://api.petfinder.com/pet.find?format=json&key=' + apikey + '&callback=?&output=basic';

        if (animal != 'all') {
            apiUrl += '&animal=' + animal;
        }
        if (location) {
            apiUrl += '&location=' + location;
        }
        if (breed) {
            apiUrl += '&breed=' + breed;
        }
        if (age) {
            apiUrl += '&age=' + age;
        }
        if (gender) {
            apiUrl += '&gender=' + gender;
        }

        console.log('searching for pets...');
        $.getJSON(apiUrl)
            .success(function (response, callback) {
                console.log(response);
            });
    };

    return {
        searchForPets: searchForPets,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        getFavorites: getFavorites
            //        addToFriends: addToFriends,
            //        removeFromFriends: removeFromFriends
            //        getFriends: getFriends
    }
});

// User Search Factory
//app.factory('UserSearch', function UserSearch($http, $rootScope) {
//
//    // array of user IDs
//    var friends = $rootScope.friends;
//
//    // add the given user to the list of friends
//    var addToFriends = function (user) {
//        friends.push(user);
//    };
//
//    // remove the given user from the list of friends
//    var removeFromFriends = function (user) {
//        var index = friends.indexOf(user);
//        friends.splice(index, 1);
//    };
//
//    // return list of friends
//    var getFriends = function () {
//        return friends;
//    };
//
//    return {
//        addToFriends: addToFriends,
//        removeFromFriends: removeFromFriends,
//        getFriends: getFriends
//    }
//});