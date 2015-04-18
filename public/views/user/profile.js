// Controller for Profile
app.controller('ProfileController', function ($scope, $http, $rootScope, UserFactory) {
    // get all users
    $http.get('/api/users')
        .success(function (users) {
            $scope.users = users;
        });

    $scope.removeFromFavorites = function (unFavorite) {
        UserFactory.removeFromFavorites(unFavorite);
    }

    $http.get('/api/user/' + $rootScope.currentUser._id)
        .success(function (user) {
            UserFactory.getFavorites(user);

            var getFriends = function () {
                $scope.friendsList = [];
                angular.forEach(user.friends, function (friend) {
                    $http.get('/api/user/' + friend)
                        .success(function (friendObject) {
                            $scope.friendsList.push(friendObject);
                        });
                });
            }

            getFriends();

            // add the given friend to the current user's friend list
            $scope.addToFriends = function (newFriend) {

                // add the new friend to the friends array
                user.friends.push(newFriend._id);
                var updatedUser = user;

                // update the current user to the database
                $http.put('/api/user/' + user._id, updatedUser)
                    .success(function (user) {

                        // update the local friend list
                        $scope.friendsList = user.friends;
                        getFriends();
                    });
            };

            // remove the given friend from the current user's friend list
            $scope.removeFromFriends = function (exFriend) {

                // get the index of friend and remove it from the array
                var index = user.friends.indexOf(exFriend._id);
                user.friends.splice(index, 1);
                var updatedUser = user;

                // update the current user
                $http.put('/api/user/' + user._id, updatedUser)
                    .success(function (user) {

                        // update the local friend list
                        $scope.friendsList = user.friends;
                        getFriends();
                    });
            };

        });

});