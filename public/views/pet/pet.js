app.controller('PetController', function ($scope, $http, $rootScope, $routeParams, PetFactory) {
    $scope.hello = "Hello from Pet Controller";

    // get the ID of the pet
    var petID = $routeParams.id;

    // get the pet object
    PetFactory.getPet(petID, function (pet) {
        $scope.pet = pet;
        $scope.$apply();
        console.log('\npetprofile');
        console.log($scope.pet);
    });
});