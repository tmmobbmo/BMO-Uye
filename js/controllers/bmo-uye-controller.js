'use strict';

define([
	'angular'
], function (angular) {
	return ['$scope', '$location',
		function ($scope, $location) {
			$scope.testString = "Test String";
		}
	];
});
