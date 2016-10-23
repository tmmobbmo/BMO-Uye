define([
	'angular',
	'angular-route',
	'controllers/bmo-uye-controller',
	'controllers/aidat-controller',
	'controllers/login-controller',
	'services/uye-service'
], function(angular, ngRoute, uyeContoller, aidatController, loginController, uyeService){
	var module = angular.module('bmoUye', [
			'ngRoute',
			uyeService.name
		])
		.controller('LoginController', loginController)
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    		$locationProvider.html5Mode(true);
    		$locationProvider.hashPrefix('!');
    		$routeProvider
    			.when('/', {
    				templateUrl: '/templates/login.tpl.html'
    			})
    			.when('/genel', {
    				templateUrl: '/templates/main-page.tpl.html'
    			})
    			.when('/aidat', {
    				templateUrl: '/templates/uye-aidat.tpl.html',
    				controller: aidatController
    			})
    			.otherwise({
    				redirectTo: '/'
    			})
	}]);
	angular.bootstrap(document, ['bmoUye'])
})
