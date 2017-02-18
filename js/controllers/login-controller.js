'use strict';
define([
    'angular',
    'angular-cookies',
    '../services/uye-service'
], function(angular, angularCookie, uyeServiceModule) {

    var module = angular.module('loginController', [
        uyeServiceModule.name,
        'ngCookies'
    ]).controller('LoginController', LoginController)

    LoginController.$inject = ['$scope', '$location', 'Uye', '$cookies'];

    function LoginController($scope, $location, Uye, $cookies) {

        if (Uye.getAuthorizationCookie()) {
            $location.path('/ozet');
        }
        $scope.login = function(username, password) {
            Uye.login(username, password).then(function successCallback(response) {
                Uye.setAuthorizationCookie(response.data.token);
                $location.path('/ozet');
            }, function errorCallback(response) {
                $scope.errorMessage = "Kullanıcı adınızı ve şifrenizi kontrol ederek tekrar deneyiniz!";
            });
        };
    }

    return module;
});
