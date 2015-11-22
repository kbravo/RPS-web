var app = angular.module('myApp.landing', []);

app.controller('landingController', ['$scope', function($scope) {
	$scope.identify = "You are on landing!";
}]);
