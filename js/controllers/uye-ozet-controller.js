'use strict';
define([
    'angular',
    'angular-cookies',
    '../services/uye-service'
], function(angular, angularCookie, uyeServiceModule) {

    var module = angular.module('uyeOzetController', [
        uyeServiceModule.name,
        'ngCookies'
    ]).controller('UyeOzetController', UyeOzetController)

    UyeOzetController.$inject = ['$rootScope', '$scope', '$location', 'Uye', '$cookies'];

    function UyeOzetController($rootScope, $scope, $location, Uye, $cookies) {
        $rootScope.isOzetActive = true;
        $rootScope.isBilgiActive = false;
        $rootScope.isAidatActive = false;
        Uye.getMemberInfo().then(function successCallback(response) {
            $rootScope.user = response.data;
            // console.log("User: ", $scope.user);
        }, function errorCallback(response) {
            $scope.errorMessage = "Please try again later";
        });

        Uye.getSummaryDebt().then(function successCallback(response) {
            $scope.debt = response.data;
        }, function errorCallback(response) {
            $scope.errorMessage = "An error occured!";
        });

        Uye.getTrainingCount().then(function successCallback(response) {
            $scope.trainingCount = response.data;
        }, function errorCallback(response) {
            $scope.errorMessage = "An error occured!";
        });

        Uye.getUpcomingEventCount().then(function successCallback(response) {
            $scope.upcomingEventCount = response.data;
        }, function errorCallback(response) {
            $scope.errorMessage = "An error occured!";
        });

        Uye.getActiveAnnouncementList().then(function successCallback(response) {
            $scope.activeAnnouncementList = response.data;
        }, function errorCallback(response) {
            $scope.errorMessage = "An error occured!";
        });

        Uye.getActiveAnnouncementCount().then(function successCallback(response) {
            $scope.activeAnnouncementCount = response.data;
        }, function errorCallback(response) {
            $scope.errorMessage = "An error occured!";
        });

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
