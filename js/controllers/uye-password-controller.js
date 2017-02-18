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

        $scope.updatePassword = function(oldPassword, newPassword, newPasswordAgain) {
            // console.log("Password update");
            Uye.updatePassword(oldPassword, newPassword, newPasswordAgain).then(function successCallback(response) {
                // console.log("succesfully updated!");
            }, function errorCallback(response) {
                $scope.errorMessage = "An error occured!";
            });
        };

        $scope.logout = function() {
            Uye.logout().then(function successCallback(response) {
                Uye.deleteAuthorizationCookie();
                $location.path('/');
            }, function errorCallback(response) {
                // console.log(response);
            });
        };
    }

    return module;
});
