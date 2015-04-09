$(document).foundation();

var app = angular.module('PetfinderApp', []);

app.controller('HomeController', function ($scope) {
    $scope.hello = "Hello World from Petfinder Controller!";
});