/*global require*/
'use strict';

require.config({
	paths: {
		'angular': '../node_modules/angular/angular',
		'ui-router': '../node_modules/angular-ui-router/release/angular-ui-router',
		'angular-route': '../node_modules/angular-route/angular-route',
		'angular-cookies': '../node_modules/angular-cookies/angular-cookies'
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
        }        ,
        'angular-cookies':{
            deps: ['angular']
        }
	},
	deps: ['app']
});
