/*global require*/
'use strict';

require([
	'angular'
], function (angular) {
	require([
		'controllers/bmo-uye-controller', 
		'directives/todoFocus', 
		'directives/todoEscape',
		'services/todoStorage'
	], function (bmoUyeController, todoFocusDir, todoEscapeDir, todoStorageSrv) {
		angular
			.module('bmoUye', [todoFocusDir, todoEscapeDir, todoStorageSrv])
			.controller('BmoUyeController', bmoUyeController);
		angular.bootstrap(document, ['bmoUye']);			
	});	
});
