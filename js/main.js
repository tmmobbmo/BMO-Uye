/*global require*/
'use strict';

require.config({
	paths: {
		'angular': '../node_modules/angular/angular',
		'ui-router': '../node_modules/angular-ui-router/release/angular-ui-router',
		'angular-route': '../node_modules/angular-route/angular-route'
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
        }
	},
	deps: ['app']
});
