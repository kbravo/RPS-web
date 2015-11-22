var app = angular.module('myApp.page1', []);

app.controller('page1Controller', ['$scope', function($scope) {
    var output = document.getElementById('output');
    var outputimg = document.getElementById('outputimg');
    var numOfFingers = document.getElementById('numOfFingers');
    var options = { enableGestures: true };
    var riggedHandPlugin;

    Leap.loop(options, function (frame) {
		if(frame.hands.length > 0) {	
	    	var hand = frame.hands[0];
	    	if(hand.grabStrength < 0.4) {
	    		output.innerHTML = 'Guesture: ' + "Paper";
	    		outputimg.src = "img/paper.jpeg";
	    	} else if(hand.grabStrength > 0.4 && hand.grabStrength < 0.9) {
	    		output.innerHTML = 'Guesture: ' + "Unidentified Guesture";
	    		$scope.currentPath = "img/confused.png";
	    	} 
	    	else if(hand.grabStrength > 0.9) {
	    		output.innerHTML = 'Guesture: ' + "Rock";
	    		outputimg.src = "img/stone.png";
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

	        } else if(extendedFingers == 1 || extendedFingers == 3) {
	        	output.innerHTML = 'Guesture: ' + "Unidentified Guesture";
	        	outputimg.src = "img/confused.png"
	        }

	        numOfFingers.innerHTML = 'Number of Fingers: ' + extendedFingers;
    	}
	}).use('riggedHand')
    .use('handEntry')
    .on('riggedHand.meshAdded', function(handMesh, leapHand){
  		handMesh.material.opacity = 2;
	}).connect();

    riggedHandPlugin = Leap.loopController.plugins.riggedHand;
}]);

