var app = angular.module('myApp.page2', []);

app.controller('page2Controller', ['$scope', '$location', '$routeParams', '$window', function($scope, $location, $routeParams, $window) {
	$scope.identify = "You are on page - 2!";
	var CLIENT_ID = 3196;
	
	var index1 = 0;
	var index2 = 0;
	console.log($location.absUrl());
	var url = new String($location.absUrl());
	index1 = url.lastIndexOf("=");
	index2 = url.lastIndexOf("#");
	if(index1 > 0 && index2 > 0) {
		url = url.substring(index1+1, index2);
	}
	console.log(url);

	$scope.authenticate = function() {
		console.log('foo');
		$window.location.href = 'https://api.venmo.com/v1/oauth/authorize?client_id=' + CLIENT_ID + '&scope=make_payments%20access_profile&response_type=token';
	}
}]);
