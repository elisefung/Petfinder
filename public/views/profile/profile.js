app.controller('ProfileController', function ($scope, $http, $rootScope) {

    $http.get('/api/users')
        .success(function (users) {
            $scope.users = users;
        });

    //    $scope.remove = function (user) {
    //        $http.delete('/api/users/' + user._id)
    //            .success(function (users) {
    //                $scope.users = users;
    //            });
    //    }

    $scope.update = function (user) {
        $http.put('/api/users/' + user._id, user)
            .success(function (users) {
                $scope.users = users;
            });
    }

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

    var currentUser = $rootScope.currentUser;
    $scope.friendsList = currentUser.friends;

    $scope.addToFriends = function (newFriend) {
        $http.get('/api/users/' + currentUser._id)
            .success(function (user) {
                user.friends.push(newFriend);
                var updatedUser = user;
                console.log('updatedUser: ' + updatedUser);
                $http.put('/api/users/' + currentUser._id, updatedUser)
                    .success(function (user) {
                        $scope.friendsList = user.friends;
                    });
            });
    }

});