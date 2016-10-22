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
		.controller('BmoUyeController', uyeContoller)
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    		$locationProvider.html5Mode(true);
    		$locationProvider.hashPrefix('!');
    		$routeProvider
    			.when('/', {
    				templateUrl: '/templates/main-page.tpl.html'
    				//template: '<span>{{testString}}</span>'
    			})
    			.when('/aidat', {
    				templateUrl: '/templates/uye-aidat.tpl.html',
    				//template: '<span>{{aidatString}}</span>',
    				controller: aidatController
    			})
    			.when('/login', {
    				templateUrl : '/templates/login.tpl.html',
    				controller: loginController
    			})
    			.otherwise({
    				redirectTo: '/'
    			})
	}]);
	angular.bootstrap(document, ['bmoUye'])
})
