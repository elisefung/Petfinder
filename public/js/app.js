var app = angular.module('PetfinderApp', ['ngRoute']);

// Configure Routing
app.config(function ($routeProvider, $httpProvider) {
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
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
});

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

    $rootScope.petList = [];

    // helper function that parses through pet XML data and returns JSON data
    function formatSingularPet(pet) {
        var thisPet = {};
        angular.forEach(pet, function (value, key) {
            if (value["$t"]) {
                thisPet[key] = value["$t"];
            }
            if (value["photos"]) {

                thisPet["image"] = getImage(value["photos"]["photo"]);
            }
            if (value["breed"]) {
                thisPet["breed"] = getBreed(value["breed"]);
            }

        });
        return thisPet;
    };

    function getBreed(value) {
        var breed = "";
        if (value["$t"]) {
            breed = value["$t"];
        } else {
            breed = value[0]["$t"];
        }
        return breed;
    }

    function getImage(array) {
        var img = "";
        angular.forEach(array, function (photo) {
            if (photo["@size"] == 'pn') {
                img = photo['$t'];
            }
        })

        return (img) ? img : "../../stylesheets/img/sloth.jpg";
    }

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

        $.getJSON(apiUrl)
            .success(function (response) {
                var petList = [];
                angular.forEach(response.petfinder.pets.pet, function (pet) {
                    // Convert XML -> JSON
                    console.log(pet);
                    var pet = formatSingularPet(pet);
                    if (pet) petList.push(pet);
                })

                // return petList of JSON objects
                callback(petList);
            });
    };

    var getBreeds = function (animal, callback) {
        $.getJSON('http://api.petfinder.com/breed.list?format=json&key=' + apikey + '&callback=?&animal=' + animal)
            .success(function (response) {
                var breedList = [];
                angular.forEach(response.petfinder.breeds.breed, function (breed) {
                    var breed = breed["$t"];
                    if (breed) breedList.push(breed);
                })

                // return petList of JSON objects
                callback(breedList);
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

    return {
        searchForPets: searchForPets,
        getPet: getPet,
        getBreeds: getBreeds
    }
});

// User Factory Service
app.factory('UserFactory', function UserFactory($http, $rootScope, $location, PetFactory) {

    // return an array of favorite pet objects for the given user
    var getFavorites = function (user) {
        var favorites = [];

        angular.forEach(user.favorites, function (petId) {
            PetFactory.getPet(petId.id, function (petObject) {
                favorites.push(petObject);
                $rootScope.favorites = favorites;
                $rootScope.$apply();
            });
        });
    };

    var getFriends = function (user) {
        var friends = [];
        angular.forEach(user.friends, function (friend) {
            $http.get('/api/user/' + friend._id)
                .success(function (friendObject) {
                    friends.push(friendObject);
                    $rootScope.friends = friends;
                });
        });
    };

    var addToFavorites = function (newFavorite) {
        $http.get('/loggedin').success(function (checkUser) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (checkUser !== '0') {

                // add the pet to the current user's favorites array
                $rootScope.currentUser.favorites.push(newFavorite);

                // update the current user to the database
                $http.put('/api/user/' + $rootScope.currentUser._id, $rootScope.currentUser)
                    .success(function (myUser) {});
            }

            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                $location.url('/login');
            }
        });
    };

    return {
        getFavorites: getFavorites,
        getFriends: getFriends,
        addToFavorites: addToFavorites
    }
});