app.controller('PetController', function ($scope, $http, $rootScope, $routeParams) {
    $scope.hello = "Hello from Pet Controller";

    // get the ID of the pet
    var petID = $routeParams.index;

    // get the pet object
    var pet = PetFactory.getPet(petID);


});