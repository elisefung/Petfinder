app.controller('SearchController', function ($scope, $http, PetSearch) {
    $scope.hello = "hello from search controller";
    $scope.query = {
        animal: 'all'
    };

    //    $http.get("/api/pets")
    //        .success(function (response) {
    //            $scope.petList = response;
    //        });

    $scope.petList = [];
    $scope.search = function (query) {
        console.log('starting search');
        PetSearch.searchForPets(query, function (pets) {
            $scope.petList = pets;
            console.log('\nPets from Petsearch');
            console.log($scope.petList);
        });
    }

});