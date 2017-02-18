'use strict';
define([
    'angular',
    '../services/uye-service'
], function(angular, uyeServiceModule) {

    var module = angular.module('paymentFailureController', [
        uyeServiceModule.name,
    ]).controller('PaymentFailureController', PaymentFailureController)

    PaymentFailureController.$inject = ['$rootScope', '$scope', '$location', 'Uye', '$cookies'];

    function PaymentFailureController($rootScope, $scope, $location, Uye, $cookies) {
        // console.log("In failure controller");
    }

    return module;
});
