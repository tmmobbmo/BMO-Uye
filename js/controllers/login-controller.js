'use strict';

define([
	'angular',
	'../services/uye-service'
], function (angular, uyeServiceModule) {
	return ['$scope', '$location', 'Uye',
		function ($scope, $location, Uye) {
			$scope.login = function(username, password) {
				console.log("Form submitted: " + username + " " + password);
				Uye.login(username, password).then(function successCallback(response){
					console.log("Success");
					$location.path('/genel');
				}, function errorCallback(response){
					console.log("Error");
					console.log(response);
				});
			}
		}
	];
});
