var app = angular.module('myApp.landing', []);

app.controller('landingController', ['$scope', '$window', '$location', '$http', '$rootScope', '$timeout', '$element', function($scope, $window, $location, $http, $rootScope, $timeout, $element) {
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

	var pollServer = function() {
		console.log('polling');
		$scope.data = {};
		var tick = function() {
			console.log($rootScope.name);
			$http({
				method: 'GET',
				url: 'http://rps-server.mybluemix.net/poll?name='+$rootScope.name
			}).then(function(response) {
				$scope.data = response.data;
				console.log($scope.data);
				if($scope.data == 'matched') {
					$location.path('/play');
				}
			});
			if($location.path() != '/play') {
				$timeout(tick, 5000);
			}
		}
		tick();
	}

	$scope.join = function() {
		var data = {
			name: $scope.name
		}

		$rootScope.name = $scope.name;

        $http({
		    method: 'POST',
		    url: "http://rps-server.mybluemix.net/join",
		    data: "name=" + $scope.name,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			$scope.joined = true;
			console.log(response);
			pollServer();
		});
	}
}]);
