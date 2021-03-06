(function () {
'use strict';
var app = angular.module('myApp.page1', []);

app.controller('page1Controller', ['$scope', '$rootScope', '$location', '$interval', function($scope, $rootScope, $location, $interval) {
	$rootScope.currentChoice = -1;
	var i = 0;

	var timer = 1;
	var z = 0;

	$scope.timer_text = "Ready?";
	var promise = $interval(convert, 1000);

    var output = document.getElementById('output');
    var outputimg = document.getElementById('outputimg');
    var numOfFingers = document.getElementById('numOfFingers');
    var options = { enableGestures: true };
    var riggedHandPlugin;

	function convert() {
		console.log("timer "+ timer);
		console.log("turnover" + z);
		if(timer == 1) {
			$scope.timer_text = "Ready?";
			console.log("here 1")
			timer++;
		} else if(timer == 2) {
			$scope.timer_text = "Set"
			console.log("here 2")
			timer++;
		} else if(timer == 3) {
			$scope.timer_text = "Go!"
			console.log("here 3")
			timer++;
		} else if(timer == 4) {
			$scope.timer_text ="Recording!"
			console.log("here 4")
			timer++;
		} else if(timer == 5) {
			console.log("here 5");
			timer++;
		} else if(timer == 6) {
			console.log("here 6");
			$scope.timer_text = "Move Sent!"
			timer = 1;
			z++;
		}

		if(z == 3) {
			$location.path('/info');
			$interval.cancel(promise);
		}
	}

    Leap.loop(options, function (frame) {
		if(frame.hands.length > 0) {	
	    	var hand = frame.hands[0];
	    	if(hand.grabStrength < 0.4) {
	    		output.innerHTML = 'Guesture: ' + "Paper";
	    		outputimg.src = "img/paper.jpeg";
	    		$rootScope.currentChoice = 0;
	    	} else if(hand.grabStrength > 0.4 && hand.grabStrength < 0.9) {
	    		output.innerHTML = 'Guesture: ' + "Unidentified Guesture";
	    		$scope.currentPath = "img/confused.png";
	    		$rootScope.currentChoice = -1;
	    	} 
	    	else if(hand.grabStrength > 0.9) {
	    		output.innerHTML = 'Guesture: ' + "Rock";
	    		outputimg.src = "img/stone.png";
	    		$rootScope.currentChoice = 2;
	    	}
	    	
	    	var extendedFingers = 0;
	    	var fingerlist = [];
	    	var isScissors = 0;
	        
	        for(var f = 0; f < hand.fingers.length; f++) {
	            var finger = hand.fingers[f];
	            if(finger.extended) {
	    			fingerlist.push(finger.type)
	                extendedFingers++;
	            }
	        }

	        for(var i = 0; i < fingerlist.length; i++) {
	        	if(fingerlist[i] == 1 || fingerlist[i] == 2)
	        		isScissors++;
	        }
	        
	        if(isScissors == 2 && extendedFingers == 2) {
	        	output.innerHTML = 'Guesture: ' + "Scissors";
	        	outputimg.src = "img/scissors.png";
	        	$rootScope.currentChoice = 1;

	        } else if(extendedFingers == 1 || extendedFingers == 3) {
	        	output.innerHTML = 'Guesture: ' + "Unidentified Guesture";
	        	outputimg.src = "img/confused.png"
	        	$rootScope.currentChoice = -1;
	        }

	        numOfFingers.innerHTML = 'Number of Fingers: ' + extendedFingers;
    	}
	}).use('riggedHand')
    .use('handEntry')
    .on('riggedHand.meshAdded', function(handMesh, leapHand){
  		handMesh.material.opacity = 2;
	}).connect();

    $scope.recordMove = function() {
    	if(i < 18) {
			i += 6;
			
		
				//API method handling ($rootScope.currentChoice, $rootScope.name, i). Find game Query(P1, P2). Go to Game. Compare and tell the results. Adjudge winner.
				//rootScope variable final call and comparison HashMap<key, value>?? ++ a play again button 
				
		
		}
	}

	if($location.path() == '/play') {
		$interval(function(){ $scope.recordMove(); }, 6000);
	}

    riggedHandPlugin = Leap.loopController.plugins.riggedHand;
}]);

})();

