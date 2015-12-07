var app = angular.module('myApp.testpage', []);

app.controller('testController', ['$scope', '$interval', function($scope, $interval) {
	var par = $interval( function(){ $scope.convert(); }, 3000);
	var i = 0;
	$scope.boozo = false;
	$scope.convert = function() {
		if($scope.boozo == false)
			$scope.boozo = true;
		else
			$scope.boozo = false;
		i++;
		console.log(i);
		if(i == 10) {
			$interval.cancel(par);
			$scope.boozo = true;
		}

	};

	

}]);