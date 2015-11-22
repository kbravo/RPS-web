(function () {
'use strict';
var app = angular.module('myApp', ['ngRoute', 'myApp.page1', 'myApp.page2']); //Dependency declaration for the Angular app

app.config(function($routeProvider) {
	//Routing to pages
    $routeProvider
         .when('/page1', {
            templateUrl : 'js/src/page1/page1.html',
            controllerUrl  : 'js/src/page1/controller.js'
        })
        .when('/page2', {
            templateUrl : 'js/src/page2/page2.html',
            controllerUrl  : 'js/src/page2/controller.js'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.controller('appController', ['$scope', function($scope) {
}]);

})();
