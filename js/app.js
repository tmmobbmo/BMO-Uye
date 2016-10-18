define([
	'angular',
	'angular-route',
	'controllers/bmo-uye-controller',
	'controllers/aidat-controller', 
	'directives/todoFocus', 
	'directives/todoEscape',
	'services/todoStorage'
], function(angular, ngRoute, uyeContoller, aidatController, todoFocusDir, todoEscapeDir, todoStorageSrv){
	var module = angular.module('bmoUye', ['ngRoute', todoFocusDir, todoEscapeDir, todoStorageSrv])
		.controller('BmoUyeController', uyeContoller)
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    		$locationProvider.html5Mode(true);
    		$locationProvider.hashPrefix('!');
    		$routeProvider
    			.when('/', {
    				//templateUrl: '/templates/main-page.tpl.html'
    				template: '<span>{{testString}}</span>'
    			})
    			.when('/aidat', {
    				//templateUrl: '/templates/uye-aidat.tpl.html',
    				template: '<span>{{aidatString}}</span>',
    				controller: aidatController
    			})
    			.otherwise({
    				redirectTo: '/'
    			})
	}]);
	angular.bootstrap(document, ['bmoUye'])
})
