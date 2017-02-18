'use strict';

define([
    'angular',
    'angular-cookies'
], function(angular, angularCookie) {
    var module = angular.module('uyeService', [
        'ngCookies'
    ]).factory('Uye', UyeService);

    var rootUrl = 'api';

    function UyeService($http, $q, $cookies, $interpolate) {
        var service = {
            login,
            logout,
            setAuthorizationCookie,
            getMemberInfo,
            getAuthorizationCookie,
            deleteAuthorizationCookie,
            getSubscriptionInfo,
            getSubscriptionDebt,
            getSubscriptionReceiptList,
            getTrainingCount,
            getSummaryDebt,
            getUpcomingEventCount,
            getActiveAnnouncementList,
            getActiveAnnouncementCount,
            getAnnouncementList,
            createNewAnnouncement,
            updatePassword,
            sendGarantiPaymentRequest
        };

        function login(username, password) {
            var data = {
                "username": username,
                "password": password
            };
            return $http.post(rootUrl + '/auth/login', data)
        };

        function logout() {
            console.log("logging out....");
            return sendGetRequest('/auth/logout');
        }

        function sendGetRequest(url, data) {
          console.log(url + " -> " + data);
            var req = {
                method: 'GET',
                url: rootUrl + url,
                headers: {
                    'Authorization': getAuthorizationCookie()
                },
                data: data
            };
            console.log("Req - GET: ", req);
            return $http(req);
        };

        function sendPostRequest(url, data) {
            var req = {
                method: 'POST',
                url: rootUrl + url,
                headers: {
                    'Authorization': getAuthorizationCookie()
                },
                data: data
            };
            console.log("Req - POST: ", req);
            return $http(req);
        };

        function sendGarantiPaymentRequest(paymentAmount) {
            var url = $interpolate('/subscription/pay/{{paymentAmount}}')({paymentAmount: paymentAmount});
            console.log("Url: ", url);
        	return sendPostRequest(url);
        }

        function setAuthorizationCookie(token) {
            // TODO: Set Expiration time for cookie
            $cookies.put("Authorization", token);
        };

        function getAuthorizationCookie() {
            return $cookies.get("Authorization");
        };

        function deleteAuthorizationCookie() {
            $cookies.remove("Authorization");
        };

        function getMemberInfo() {
            return sendGetRequest('/member/info');
        };

        // subscription services
        function getSubscriptionInfo() {
            return sendGetRequest('/subscription/info');
        };

        function getSubscriptionDebt() {
            return sendGetRequest('/subscription/debt');
        };

        function getSubscriptionReceiptList() {
            return sendGetRequest('/subscription/receipt/list');
        };

        // !subscription services

        // dashboard services

        function getTrainingCount() {
            return sendGetRequest('/summary/training/count');
        }

        function getSummaryDebt() {
            return sendGetRequest('/summary/debt');
        }

        function getUpcomingEventCount() {
            return sendGetRequest('/summary/event/count');
        }

        function getActiveAnnouncementList() {
            return sendGetRequest('/summary/announcement/list');
        }

        function getActiveAnnouncementCount() {
            return sendGetRequest('/summary/announcement/count');
        }

        // !dashboard services

        // announcement services
        function getAnnouncementList() {
            return sendGetRequest('/announcement/list');
        }

        function createNewAnnouncement(announcement) {
            var data = {
                "title": announcement.title,
                "detail": announcement.detail
            };
            return sendPostRequest('/announcement/create', data);
        }
        // !announcemenet services

        // change password
        function updatePassword(oldPassword, newPassword, newPasswordAgain) {
            var data = {
                "eskiParola"        : oldPassword,
                "yeniParola"        : newPassword,
                "yeniParolaTekrar"  : newPasswordAgain
            };
            return sendPostRequest('/member/change/password', data);
        }
        // !change password


        return service;
    };

    UyeService.$inject = ['$http', '$q', '$cookies', '$interpolate']

    return module;
});
