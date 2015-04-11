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
    $scope.numberOfFriends = $scope.friendsList.length;

    var updateFriendCount = function () {
        $scope.numberOfFriends = $scope.friendsList.length;
    }

    $scope.addToFriends = function (newFriend) {

        // get the current user
        $http.get('/api/user/' + currentUser._id)
            .success(function (user) {

                // add the new friend to the friends array
                user.friends.push(newFriend);
                var updatedUser = user;

                // update the current user
                $http.put('/api/user/' + currentUser._id, updatedUser)
                    .success(function (user) {

                        // save new friend list
                        $scope.friendsList = user.friends;
                        updateFriendCount();
                    });
            });
    }

    $scope.removeFromFriends = function (exFriend) {

        // get the current user
        $http.get('/api/user/' + currentUser._id)
            .success(function (user) {

                // add the new friend to the friends array
                var index = user.friends.indexOf(exFriend);
                user.friends.splice(index, 1);
                var updatedUser = user;

                // update the current user
                $http.put('/api/user/' + currentUser._id, updatedUser)
                    .success(function (user) {

                        // save new friend list
                        $scope.friendsList = user.friends;
                        updateFriendCount();
                    });
            });
    }

});