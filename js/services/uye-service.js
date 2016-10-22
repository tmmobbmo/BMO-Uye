'use strict';
 
define([
	'angular'
], function (angular) {
	var module = angular.module('uyeService', [])
		.factory('Uye', UyeService);

	function UyeService($http) {
		var service = {
			login
		};
		
		function login(username, password) {
			var data = {
				"username": username,
				"password": password
			};
			return $http.post('http://95.85.41.38:8087/auth/login', data)
		}

		return service;
	};

	UyeService.$inject = ['$http']
	
	return module;
});
