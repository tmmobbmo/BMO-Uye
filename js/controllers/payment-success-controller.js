'use strict';
define([
    'angular',
    '../services/uye-service'
], function(angular, uyeServiceModule) {

    var module = angular.module('paymentSuccessController', [
        uyeServiceModule.name,
    ]).controller('PaymentSuccessController', PaymentSuccessController)

    PaymentSuccessController.$inject = ['$rootScope', '$scope', '$location', 'Uye', '$cookies'];

    function PaymentSuccessController($rootScope, $scope, $location, Uye, $cookies) {
        // console.log("In success controller");
    }

    return module;
});
