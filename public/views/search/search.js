app.controller('SearchController', function ($scope, $http, PetSearch) {
    $scope.hello = "hello from search controller";
    $scope.query = {
        type: 'all'
    };

    //    $http.get("/api/pets")
//        .success(function (response) {
//            $scope.petList = response;
//        });

    $scope.petList = [];
    $scope.search = function () {
        console.log('starting search');
        PetSearch.searchForPets(function (pets) {
            $scope.petList = pets;
            console.log('petlist: ' + $scope.petList);
        });
    }

});