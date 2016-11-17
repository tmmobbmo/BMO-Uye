define([
    'angular',
    'angular-route',
    'angular-cookies',
    'angular-credit-cards',
    'controllers/uye-bilgi-controller',
    'controllers/uye-aidat-controller',
    'controllers/uye-password-controller',
    'controllers/login-controller',
    'controllers/uye-ozet-controller',
    'controllers/payment-success-controller',
    'controllers/payment-failure-controller',
    'services/uye-service'
], function(angular, ngRoute, ngCookies, angularCreditCards, uyeBilgiControllerModule, uyeAidatControllerModule, uyePasswordControllerModule, loginControllerModule, uyeOzetControllerModule, paymentSuccessControllerModule, paymentFailureControllerModule, uyeService) {

    var module = angular.module('bmoUye', [
            'ngRoute',
            'ngCookies',
            'credit-cards',
            uyeBilgiControllerModule.name,
            loginControllerModule.name,
            uyeAidatControllerModule.name,
            uyeOzetControllerModule.name,
            uyePasswordControllerModule.name,
            paymentSuccessControllerModule.name,
            paymentFailureControllerModule.name,
            uyeService.name
        ])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            $routeProvider
                .when('/', {
                    templateUrl: '/templates/login.tpl.html',
                    controller: 'LoginController'
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
                .when('/parola', {
                    templateUrl: '/templates/uye-parola.tpl.html',
                    controller: 'UyePasswordController'
                })
                .when('/success', {
                    templateUrl: '/templates/payment-success.tpl.html',
                    controller: 'PaymentSuccessController'
                })
                .when('/fail', {
                    templateUrl: '/templates/payment-failure.tpl.html',
                    controller: 'PaymentFailureController'
                })
                .otherwise({
                    redirectTo: '/'
                })
        }]);
    angular.bootstrap(document, ['bmoUye'])
})
