app.controller('PetController', function ($scope, $http, $rootScope, $routeParams, PetFactory) {
    $scope.hello = "Hello from Pet Controller";
    // get the ID of the pet
    var petID = $routeParams.id;

    // get the pet object from the Petfinder API
    PetFactory.getPet(petID, function (pet) {
        $scope.pet = pet;
        $scope.$apply();
    });

//        $scope.addToFavorites = function (pet) {
        //        // if logged in
        //            // PetFactory.addToFavorites(pet)
        //        // else redirect to /login/sign up alert
        //                    }
});