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

		Uye.getMemberInfo().then(function successCallback(response){
				$scope.user = response;
				console.log("User: ", $scope.user);
			}, function errorCallback(response){
				$scope.errorMessage = "Please try again later";
		});

		$scope.updateInfo = function() {
			console.log("Successfull update: ", $scope.user);
		};
	}

	return module
});
