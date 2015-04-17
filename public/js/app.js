var app = angular.module('PetfinderApp', ['ngRoute']);

// Configure Routing
app.config(['$routeProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/pet/search.html',
        controller: 'SearchController'
    }).
    when('/pet/:id', {
        templateUrl: 'views/pet/pet.html',
        controller: 'PetController'
    }).
    when('/user', {
        templateUrl: 'views/user/profile.html',
        controller: 'ProfileController',
        resolve: {
            loggedin: checkLoggedin
        }
    }).
    when('/user/:id', {
        templateUrl: 'views/user/profile.html',
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

// API keys
var apikey = "5ac1149d1668e6e3cfb18d3556ef8d79";
var apisig = "59b0c48e2afad3c8bba73b5659bf4a8d";

// Pet Search Factory
app.factory('PetFactory', function PetFactory($http, $rootScope) {

    // store current user
    var user = $rootScope.currentUser;
    $rootScope.petList = [];

    // helper function that parses through pet XML data and returns JSON data
    function formatSingularPet(pet) {
        var thisPet = {};
        angular.forEach(pet, function (value, key) {

            if (value["$t"]) {
                thisPet[key] = value["$t"];
            }
            if (value["photos"]) {
                thisPet[key] = value["photos"]
            }

        });
        return thisPet;

    };

    // sends a request to the Petfinder API with search queries from the search controller
    var searchForPets = function (query, callback) {
        var animal = query.animal;
        var location = query.location;
        var breed = query.breed;
        var age = query.age;
        var gender = query.gender;
        var apiUrl = 'http://api.petfinder.com/pet.find?format=json&key=' + apikey + '&callback=?&output=basic';

        // append filters if applicable
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
            apiUrl += '&sex=' + gender;
        }

        console.log('searching for pets...');
        $.getJSON(apiUrl)
            .success(function (response) {
                var petList = [];
                angular.forEach(response.petfinder.pets.pet, function (pet) {
                    // Convert XML -> JSON
                    var pet = formatSingularPet(pet);
                    if (pet) petList.push(pet);
                })

                // return petList of JSON objects
                callback(petList);
            });
    };

    // return a single pet object
    var getPet = function (petID, callback) {
        $.getJSON('http://api.petfinder.com/pet.get?format=json&key=' + apikey + '&callback=?&id=' + petID)
            .success(function (response) {
                var petProfile = formatSingularPet(response.petfinder.pet);
                callback(petProfile);
            });
    };

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

    return {
        searchForPets: searchForPets,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        getFavorites: getFavorites,
        getPet: getPet
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