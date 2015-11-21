var app = angular.module('myApp.page2', []);

app.controller('page2Controller', ['$scope', function($scope) {
	$scope.identify = "You are on page - 2!";
}]);
