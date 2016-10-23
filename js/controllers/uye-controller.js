'use strict';
define([
	'angular',
	'angular-cookies',
	'../services/uye-service'
], function (angular, angularCookie, uyeServiceModule) {

	var module = angular.module('uyeController', [
		uyeServiceModule.name,
		'ngCookies'
	]).controller('UyeController', UyeController)

	UyeController.$inject = ['$scope', '$location', 'Uye', '$cookies'];

	function UyeController($scope, $location, Uye, $cookies) {
		$scope.test = "asd";
	}

	return module
});
