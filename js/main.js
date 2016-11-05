/*global require*/
'use strict';

require.config({
	paths: {
		'angular': '../node_modules/angular/angular',
		'ui-router': '../node_modules/angular-ui-router/release/angular-ui-router',
		'angular-route': '../node_modules/angular-route/angular-route',
		'angular-cookies': '../node_modules/angular-cookies/angular-cookies',
		'jquery': '../assets/js/jquery-3.1.0.min.js',
		'bootstrap': '../assets/js/bootstrap.min.js',
		'material': '../assets/js/material.min.js',
		'angular-credit-cards': '../assets/js/angular-credit-cards'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'ui-router':{
            deps: ['angular']
        },
        'angular-route':{
            deps: ['angular']
        },
        'angular-cookies':{
            deps: ['angular']
        },
        'angular-credit-cards':{
        	deps: ['angular']
        }
	},
	deps: ['app']
});
