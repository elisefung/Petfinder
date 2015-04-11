app.controller('ProfileController', function ($scope, $http, PetSearch) {

    //    $http.get('/api/users')
    //        .success(function (users) {
    //            $scope.users = users;
    //        });
    //
    //    //    $http.get('api/users')
    //
    //    $scope.remove = function (user) {
    //        $http.delete('/api/users/' + user._id)
    //            .success(function (users) {
    //                $scope.users = users;
    //            });
    //    }
    //
    //    $scope.update = function (user) {
    //        $http.put('/api/users/' + user._id, user)
    //            .success(function (users) {
    //                $scope.users = users;
    //            });
    //    }
    //
    //    $scope.add = function (user) {
    //        $http.post('/api/users', user)
    //            .success(function (users) {
    //                $scope.users = users;
    //            });
    //    }
    //
    //    $scope.select = function (user) {
    //        $scope.user = user;
    //    }

    $scope.friendList = PetSearch.getFavorites();
    console.log("hello from profile");


});