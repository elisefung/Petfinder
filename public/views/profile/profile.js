app.controller('ProfileController', function ($scope, $http, $rootScope) {

    // get all users
    $http.get('/api/users')
        .success(function (users) {
            $scope.users = users;
        });

    // get current user's info
    $http.get('/api/user/' + $rootScope.currentUser._id)
        .success(function (user) {
            // list of all friend IDs
            $scope.friendsList = [];
            $scope.numberOfFriends = $scope.friendsList.length;

            var getFriends = function () {
                $scope.friendsList = [];
                angular.forEach(user.friends, function (friend) {
                    $http.get('/api/user/' + friend._id)
                        .success(function (friendObject) {
                            $scope.friendsList.push(friendObject);
                        });
                });
            }

            getFriends();

            var updateFriendCount = function () {
                $scope.numberOfFriends = $scope.friendsList.length;
            }

            $scope.addToFriends = function (newFriend) {
                // add the new friend to the friends array
                user.friends.push(newFriend);
                var updatedUser = user;

                // update the current user
                $http.put('/api/user/' + $rootScope.currentUser._id, updatedUser)
                    .success(function (user) {

                        // save new friend list
                        $scope.friendsList = user.friends;
                        updateFriendCount();
                        getFriends();
                    });
            }

            $scope.removeFromFriends = function (exFriend) {

                // add the new friend to the friends array
                var index = user.friends.indexOf(exFriend);
                user.friends.splice(index, 1);
                var updatedUser = user;

                // update the current user
                $http.put('/api/user/' + $rootScope.currentUser._id, updatedUser)
                    .success(function (user) {

                        // save new friend list
                        $scope.friendsList = user.friends;
                        updateFriendCount();
                        getFriends();
                    });
            }

        });


});