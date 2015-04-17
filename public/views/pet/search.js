app.controller('SearchController', function ($scope, $rootScope, $http, PetFactory, UserFactory) {
    $scope.hello = "hello from search controller";
    $scope.query = {
        location: '94024',
        animal: 'all'
    };

    // initializing the petList
    // eventually default this list with popular pets
    $rootScope.petList = [];

    // call the request to the Petfinder API 
    $scope.search = function (query) {
        console.log('starting search');
        PetFactory.searchForPets(query, function (pets) {
            $rootScope.petList = pets;
            $rootScope.$apply();
            console.log($scope.petList);
        });
    };

    $scope.addToFavorites = function (pet) {
        console.log('adding pet to your favorites');
        console.log(pet);
        UserFactory.addToFavorites(pet);
    }

});