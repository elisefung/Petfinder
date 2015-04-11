app.controller('SearchController', function ($scope, $http, PetSearch) {
    $scope.query = {
        type: 'all'
    };

    //    $http.get("/api/pets")
    //        .success(function (response) {
    //            $scope.petList = response;
    //        });

    $scope.search = function () {
        console.log('starting search');
        PetSearch.searchForPets(function (pets) {
            $scope.petList = pets;
            console.log($scope.petList);
        });
    }

});