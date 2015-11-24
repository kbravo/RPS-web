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
            templateUrl : 'js/src/play/page1.html',
            controllerUrl  : 'js/src/play/controller.js'
        })
        .when('/leaderboard', {
            templateUrl : 'js/src/page2/page2.html',
            controllerUrl  : 'js/src/page2/controller.js'
        })
        .when('/test', {
            templateUrl : 'js/src/testpage/test.html',
            controllerUrl  : 'js/src/testpage/controller.js'
        })
        .when('/info', {
            templateUrl : 'js/src/info/info.html',
            controllerUrl  : 'js/src/info/controller.js'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('appController', ['$scope', function($scope) {
}]);

})();
