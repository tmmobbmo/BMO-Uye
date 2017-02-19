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

    function testInterceptor() {
        return {
            request: function(config) {
                console.log("AAAAAAAAAA");
                console.log(config);
                return config;
            },
            requestError: function(config) {
                console.log("BBBBBBBBBBBBB");
                console.log(config);
                return config;
            },
            response: function(res) {
                console.log("CCCCCCCCCCC");
                console.log(res);
                return res;
            },
            responseError: function(res) {
                console.log("DDDDDDDDD");
               
                console.log(res);
                $location.path("/");
                return res;
            }
        }
    }

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
        .factory('testInterceptor', testInterceptor)
        .config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider) {
            $httpProvider.interceptors.push('testInterceptor');
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
