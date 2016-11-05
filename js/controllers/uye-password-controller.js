'use strict';
define([
    'angular',
    'angular-cookies',
    '../services/uye-service'
], function(angular, angularCookie, uyeServiceModule) {

    var module = angular.module('uyePasswordController', [
        uyeServiceModule.name,
        'ngCookies'
    ]).controller('UyePasswordController', UyePasswordController);

    UyePasswordController.$inject = ['$rootScope', '$scope', '$location', 'Uye', '$cookies'];

    function UyePasswordController($rootScope, $scope, $location, Uye, $cookies) {
        $rootScope.isOzetActive = false;
        $rootScope.isBilgiActive = false;
        $rootScope.isAidatActive = false;

        $scope.updatePassword = function() {
            console.log("Password update");
        };

        $scope.logout = function() {
            Uye.deleteAuthorizationCookie();
            $location.path('/');
        }
    }

    return module;
});
