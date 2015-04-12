app.controller('SearchController', function ($scope, $rootScope, $http, PetSearch) {
    $scope.hello = "hello from search controller";
    $scope.query = {
        animal: 'all'
    };

    //    $http.get("/api/pets")
    //        .success(function (response) {
    //            $scope.petList = response;
    //        });

    $rootScope.petList = [{
        name: "Suzy"
    }];

    $scope.search = function (query) {
        console.log('starting search');
        PetSearch.searchForPets(query, function (pets) {
            $rootScope.petList = pets;
            //            console.log($scope.petList);
        });

    };

});