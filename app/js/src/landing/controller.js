var app = angular.module('myApp.landing', []);

app.controller('landingController', ['$scope', '$window', '$location', '$http', function($scope, $window, $location, $http) {
	$scope.identify = "You are on landing!";
	var CLIENT_ID = 3196;
	var store = $window.localStorage;
	var key = 'access_token';

	var index1 = 0;
	var index2 = 0;
	console.log($location.absUrl());
	var url = new String($location.absUrl());
	var token = '';
	index1 = url.lastIndexOf("=");
	index2 = url.lastIndexOf("#");
	if(index1 > 0 && index2 > 0) {
		token = url.substring(index1+1, index2);
	}
	
	console.log(store.getItem(key));
	if(token != '' && url.includes("?access_token=")) {
		console.log('success');
		store.setItem(key, token);
		
	}

	console.log($scope.name);

	$scope.disablePlay = function() {
		return !store.getItem(key) || $scope.name === '' || !$scope.name;
	}

	$scope.authenticate = function() {
		console.log('foo');
		$window.location.href = 'https://api.venmo.com/v1/oauth/authorize?client_id=' + CLIENT_ID + '&scope=make_payments%20access_profile&response_type=token';
	}

	$scope.join = function() {
		var data = {
			name: $scope.name
		}


		$http.post("http://localhost:6001/join", data).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
	}
}]);
