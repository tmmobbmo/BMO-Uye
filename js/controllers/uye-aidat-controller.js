'use strict';
define([
	'angular',
	'angular-cookies',
	'../services/uye-service'
], function (angular, angularCookie, uyeServiceModule) {

	var module = angular.module('aidatController', [
		uyeServiceModule.name,
		'ngCookies'
	]).controller('AidatController', AidatController)

	AidatController.$inject = ['$scope', '$location', 'Uye', '$cookies'];

	function AidatController($scope, $location, Uye, $cookies) {
		console.log("In aidat");
		$scope.hede = "asd";
	}

	return module
});
