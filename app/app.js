(function () {
'use strict';
var app = angular.module('myApp', ['ngRoute', 'myApp.page1', 'myApp.page2', 'myApp.landing']); //Dependency declaration for the Angular app

app.config(function($routeProvider) {
    Parse.initialize("DJtjjN4Lo8Ib9vhYfLWmofj76WXPHS72dYPXuOHR", "0V7OVG8BinYF717RSWCHKPDHr10qPQSHn5gfSJ9o");
	//Routing to pages 
    $routeProvider
        .when('/', {
            templateUrl : 'js/src/landing/landing.html',
            controllerUrl  : 'js/src/landing/controller.js'
        })
         .when('/play', {
            templateUrl : 'js/src/page1/page1.html',
            controllerUrl  : 'js/src/page1/controller.js'
        })
        .when('/leaderboard', {
            templateUrl : 'js/src/page2/page2.html',
            controllerUrl  : 'js/src/page2/controller.js'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.service('participantService', function($q) {
     var Participant = Parse.Object.extend("Participant");

    this.createParticipant = function(newParticipant) {
        var e = new Participant();
        e.save(newParticipant).then(function(object) {
            alert("it worked?");
        });
    }

    this.getParticipants = function() {
        var queryObject = new Parse.Query(Participant);

        var defer = $q.defer();

        queryObject.find({
            success: function(results) {
                //console.log(results);
                defer.resolve(results);
            },
            error: function(error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

});

app.service('gamesService', function($q) {
     var Games = Parse.Object.extend("Games");

    this.createParticipant = function(newGame) {
        var e = new Games();
        e.save(newGame).then(function(object) {
            alert("it worked?");
        });
    }

    this.getGames = function() {
        var queryObject = new Parse.Query(Games);

        var defer = $q.defer();

        queryObject.find({
            success: function(results) {
                //console.log(results);
                defer.resolve(results);
            },
            error: function(error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

});


app.controller('appController', ['$scope', function($scope) {
}]);

})();
