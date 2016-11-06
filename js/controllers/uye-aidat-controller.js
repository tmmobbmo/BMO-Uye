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
        $scope.debtCountOptions = [];
        Uye.getSubscriptionInfo().then(function successCallback(response) {
            console.log("Aidat Response: ", response.data);
            $scope.aidatInfo = response.data;
            let totalDebtCount = 0;
            angular.forEach($scope.aidatInfo, function(annualDebt, key){
                totalDebtCount += annualDebt.kalanAySayisi;
            });
            for(var i = 1; i <= totalDebtCount; i++) {
                $scope.debtCountOptions.push(i);
            }
            console.log("Options: ", $scope.debtCountOptions);
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
        };

        $scope.initiatePaymentRequest = function(ccForm) {
            var ccNumber = ccForm.ccNumber.$modelValue;
            var ccCvc = ccForm.ccCvc.$modelValue;
            var ccExpMonth = ccForm.ccExpMonth.$modelValue;
            var ccExpYear = ccForm.ccExpYear.$modelValue;
            var aidatCount = ccForm.aidatCount.$modelValue;
            console.log("Values: ", ccNumber, ccCvc, ccExpMonth, ccExpYear, aidatCount);
        };
    };

    function YesNoFilter() {
        return function (boolean) {
            return boolean ? 'Yes' : 'No';
        };
    }

    return module
});
