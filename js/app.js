define([
	'angular',
	'angular-route',
	'angular-cookies',
	'controllers/uye-controller',
	'controllers/uye-aidat-controller',
	'controllers/login-controller',
	'services/uye-service'
], function(angular, ngRoute, ngCookies, uyeControllerModule, uyeAidatControllerModule, loginControllerModule, uyeService){
	var module = angular.module('bmoUye', [
			'ngRoute',
			'ngCookies',
			uyeControllerModule.name,
			loginControllerModule.name,
			uyeAidatControllerModule.name,
			uyeService.name
		])
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    		$locationProvider.html5Mode(true);
    		$locationProvider.hashPrefix('!');
    		$routeProvider
    			.when('/', {
    				templateUrl: '/templates/login.tpl.html'
    			})
    			.when('/genel', {
    				templateUrl: '/templates/main-page.tpl.html',
    				controller: 'UyeController'
    			})
    			.when('/aidat', {
    				templateUrl: '/templates/uye-aidat.tpl.html',
    				controller: 'AidatController'
    			})
    			.otherwise({
    				redirectTo: '/'
    			})
	}]);
	angular.bootstrap(document, ['bmoUye'])
})
