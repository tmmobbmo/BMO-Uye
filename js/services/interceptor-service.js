'use strict';

define([
    'angular',
    'angular-cookies'
], function(angular, angularCookie) {
    var module = angular.module('interceptorService', [
        'ngCookies'
    ]).factory('interceptor', interceptorService);

    function interceptorService($q, $cookies, $window) {
        var service = {
            request:request,
            requestError:requestError,
            response:response,
            responseError:responseError
        };

        function request(config) {
            return config;
        };
        function requestError(config) {
            return config;
        };
        function response(res) {
                return res;
        };
        function responseError(res) {
            if(res.status == 401 && res.data.path != "/auth/login"){
                $cookies.remove("Authorization");
                $window.location = "/";
                console.log(res);
                return $q.reject(response);
            }
            return $q.reject(response);
        }

        return service;
    };

    interceptorService.$inject = ['$q', '$cookies', '$window']

    return module;
});
