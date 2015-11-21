var app = angular.module('myApp.page1', []);

app.controller('page1Controller', ['$scope', function($scope) {
    $scope.identify = "You are on page - 1!";
}]);
