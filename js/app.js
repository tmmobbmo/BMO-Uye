define([
	'angular',
	'angular-route',
	'controllers/bmo-uye-controller', 
	'directives/todoFocus', 
	'directives/todoEscape',
	'services/todoStorage'
], function(angular, ngRoute, uyeContoller, todoFocusDir, todoEscapeDir, todoStorageSrv){
	var module = angular.module('bmoUye', ['ngRoute', todoFocusDir, todoEscapeDir, todoStorageSrv])
		.controller('BmoUyeController', uyeContoller)
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    		$locationProvider.html5Mode(true);
    		$locationProvider.hashPrefix('!');
	}]);
	angular.bootstrap(document, ['bmoUye'])
})
