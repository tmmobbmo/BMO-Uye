'use strict';

define([
	'angular',
	'../services/uye-service'
], function (angular, uyeServiceModule) {
	return ['$scope', '$location', 'Uye',
		function ($scope, $location, Uye) {
			$scope.loginString = "login String";
			Uye.login("44338883652", "admin").then(function successCallback(response){
				console.log("Success");
				console.log(response);
			}, function errorCallback(response){
				console.log("Error");
				console.log(response);
			});
		}
	];
});
