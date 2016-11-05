'use strict';
define([
    'angular',
    'angular-cookies',
    '../services/uye-service'
], function(angular, angularCookie, uyeServiceModule) {

    var module = angular.module('aidatController', [
        uyeServiceModule.name,
        'ngCookies'
    ]).controller('AidatController', AidatController)
    .filter('yesNo', YesNoFilter)

    AidatController.$inject = ['$rootScope', '$scope', '$location', 'Uye', '$cookies'];

    function AidatController($rootScope, $scope, $location, Uye, $cookies) {
        $rootScope.isOzetActive = false;
        $rootScope.isBilgiActive = false;
        $rootScope.isAidatActive = true;
        Uye.getSubscriptionInfo().then(function successCallback(response) {
            console.log("Aidat Response: ", response.data);
            $scope.aidatInfo = response.data;
        }, function errorCallback(response) {});

        Uye.getSubscriptionDebt().then(function successCallback(response) {
            console.log("Debt Response: ", response.data);
            $scope.debt = response.data;
        }, function errorCallback(response) {});

        Uye.getSubscriptionReceiptList().then(function successCallback(response) {
            console.log("Receipt Response: ", response.data);
            $scope.receiptInfo = response.data;
        }, function errorCallback(response) {});

        $scope.logout = function() {
            Uye.deleteAuthorizationCookie();
            $location.path('/');
        }
    };

    function YesNoFilter() {
        return function (boolean) {
            return boolean ? 'Yes' : 'No';
        };
    }

    return module
});
