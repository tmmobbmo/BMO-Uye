define([
    'angular',
    'angular-route',
    'angular-cookies',
    'angular-credit-cards',
    'controllers/uye-bilgi-controller',
    'controllers/uye-aidat-controller',
    'controllers/login-controller',
    'controllers/uye-ozet-controller',
    'services/uye-service'
], function(angular, ngRoute, ngCookies, angularCreditCards, uyeBilgiControllerModule, uyeAidatControllerModule, loginControllerModule, uyeOzetControllerModule, uyeService) {
    var module = angular.module('bmoUye', [
            'ngRoute',
            'ngCookies',
            'credit-cards',
            uyeBilgiControllerModule.name,
            loginControllerModule.name,
            uyeAidatControllerModule.name,
            uyeOzetControllerModule.name,
            uyeService.name
        ])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            $routeProvider
                .when('/', {
                    templateUrl: '/templates/login.tpl.html'
                })
                .when('/ozet', {
                    templateUrl: '/templates/uye-ozet.tpl.html',
                    controller: 'UyeOzetController'
                })
                .when('/bilgi', {
                    templateUrl: '/templates/uye-bilgi.tpl.html',
                    controller: 'UyeBilgiController'
                })
                .when('/aidat', {
                    templateUrl: '/templates/uye-aidat.tpl.html',
                    controller: 'AidatController'
                })
                .otherwise({
                    redirectTo: '/'
                })
        }]);
    angular.bootstrap(document, ['bmoUye'])
})
