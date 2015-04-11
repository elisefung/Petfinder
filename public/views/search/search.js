app.controller('SearchController', function ($scope, $http) {
    $scope.query = {
        type: 'all'
    };

    $http.get("/api/pets")
        .success(function (response) {
            $scope.petList = response;
        });

});