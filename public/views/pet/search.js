app.controller('SearchController', function ($scope, $rootScope, $http, PetFactory, UserFactory) {
    $scope.hello = "hello from search controller";
    $scope.searchTitle = "Popular Pets";
    $scope.query = {
        location: '94024',
        animal: 'all'
    };
    $scope.popular = {
        location: '94024',
        animal: 'all',
        gender: 'M',
        age: 'young'
    };

    $scope.getBreeds = function (animal) {
        console.log(animal);
        PetFactory.getBreeds(animal, function (breeds) {
            $scope.breedList = breeds;
            $scope.$apply();
        });
    }

    // initializing the petList
    // eventually default this list with popular pets
    $rootScope.petList = [];
    PetFactory.searchForPets($scope.popular, function (pets) {
        $rootScope.petList = pets;
        $rootScope.$apply();
    });
    PetFactory.getBreeds('dog', function (breeds) {
        $scope.breedList = breeds;
    })

    // call the request to the Petfinder API 
    $scope.search = function (query) {
        console.log('starting search');
        PetFactory.searchForPets(query, function (pets) {
            $rootScope.petList = pets;
            $rootScope.$apply();
        });
        if (query.animal == 'all') {
            $scope.searchTitle = "pets near " + query.location;
        } else {
            $scope.searchTitle = query.animal + 's near ' + query.location;
        }
    };

    $scope.addToFavorites = function (pet) {
        UserFactory.addToFavorites(pet);
    }

});