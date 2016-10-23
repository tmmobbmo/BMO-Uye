'use strict';
define([
	'angular',
	'angular-cookies',
	'../services/uye-service'
], function (angular, angularCookie, uyeServiceModule) {

	var module = angular.module('loginController', [
		uyeServiceModule.name,
		'ngCookies'
	]).controller('LoginController', LoginController)

	LoginController.$inject = ['$scope', '$location', 'Uye', '$cookies'];

	function LoginController($scope, $location, Uye, $cookies) {
		$scope.login = function(username, password) {
			console.log("Form submitted: " + username + " " + password);
			Uye.login(username, password).then(function successCallback(response){
				$cookies.put("Authorization", response.token);
				$location.path('/genel');
			}, function errorCallback(response){
				console.log("Error");
				console.log(response);
			});
		};
	}

	return module
});
