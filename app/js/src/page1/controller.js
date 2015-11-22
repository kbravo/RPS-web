var app = angular.module('myApp.page1', []);

app.controller('page1Controller', ['$scope', function($scope) {

    $scope.identify = "You are on page - 1!";
    var output = document.getElementById('output');
    var numOfFingers = document.getElementById('numOfFingers');
    var options = { enableGestures: true };
    Leap.loop(options, function (frame) {
		if(frame.hands.length > 0) {	
	    	var hand = frame.hands[0];
	    	if(hand.grabStrength < 0.4) {
	    		output.innerHTML = 'Guesture: ' + "Paper";
	    	} else if(hand.grabStrength > 0.4 && hand.grabStrength < 0.9) {
	    		output.innerHTML = 'Guesture: ' + "Unidentified Guesture";
	    	} 
	    	else if(hand.grabStrength > 0.9) {
	    		output.innerHTML = 'Guesture: ' + "Rock";
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

	        } else if(extendedFingers == 1 || extendedFingers == 3) {
	        	output.innerHTML = 'Guesture: ' + "Unidentified Guesture";
	        }

	        numOfFingers.innerHTML = 'Number of Fingers: ' + extendedFingers;
    	}
	});
}]);

