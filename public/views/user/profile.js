// Controller for Profile
app.controller('ProfileController', function ($scope, $http, $rootScope, PetFactory) {

    $scope.user = $rootScope.currentUser;

    // get all users
    $http.get('/api/users')
        .success(function (users) {
            $scope.users = users;
        });

    $scope.favoritesList = $scope.user.favorites;

    // get the current user object
    $http.get('/api/user/' + $scope.user._id)
        .success(function (user) {

            $scope.friendsList = [];
            $scope.numberOfFriends = $scope.friendsList.length;
            $scope.favoritesList = [];

            var getFavorites = function () {
                $scope.favoritesList = [];
                angular.forEach(user.favorites, function (pet) {
                    PetFactory.getPet(pet.id, function (petObject) {
                        $scope.favoritesList.push(petObject);
                    });
                });
            };

            getFavorites();


            // parse through array of friend IDs and return array of friend objects
            var getFriends = function () {
                $scope.friendsList = [];
                angular.forEach(user.friends, function (friend) {
                    $http.get('/api/user/' + friend._id)
                        .success(function (friendObject) {
                            $scope.friendsList.push(friendObject);
                        });
                });
            };

            getFriends();

            // helper function to update the number of friends count
            var updateFriendCount = function () {
                $scope.numberOfFriends = $scope.friendsList.length;
            };

            // add the given friend to the current user's friend list
            $scope.addToFriends = function (newFriend) {

                // add the new friend to the friends array
                user.friends.push(newFriend);
                var updatedUser = user;

                // update the current user to the database
                $http.put('/api/user/' + $rootScope.currentUser._id, updatedUser)
                    .success(function (user) {

                        // update the local friend list
                        $scope.friendsList = user.friends;
                        updateFriendCount();
                        getFriends();
                    });
            };

            // remove the given friend from the current user's friend list
            $scope.removeFromFriends = function (exFriend) {

                // get the index of friend and remove it from the array
                var index = user.friends.indexOf(exFriend);
                user.friends.splice(index, 1);
                var updatedUser = user;

                // update the current user
                $http.put('/api/user/' + $rootScope.currentUser._id, updatedUser)
                    .success(function (user) {

                        // update the local friend list
                        $scope.friendsList = user.friends;
                        updateFriendCount();
                        getFriends();
                    });
            };

        });
});