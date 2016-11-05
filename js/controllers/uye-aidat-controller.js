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

    AidatController.$inject = ['$scope', '$location', 'Uye', '$cookies'];

    function AidatController($scope, $location, Uye, $cookies) {
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
    }

    return module
});
