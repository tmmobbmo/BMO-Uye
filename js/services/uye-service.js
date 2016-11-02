'use strict';

define([
	'angular',
	'angular-cookies'
], function (angular, angularCookie) {
	var module = angular.module('uyeService', [
		'ngCookies'
	]).factory('Uye', UyeService);

	function UyeService($http, $q, $cookies) {
		var service = {
			login,
			setAuthorizationCookie,
			getMemberInfo,
			getAuthorizationCookie,
	        deleteAuthorizationCookie,
			getSubscriptionInfo,
			getSubscriptionDebt,
			getSubscriptionReceiptList
		};


		function login(username, password) {
			//return $q(function (resolve, reject) {
            //        resolve({"token": "test-token"});
            //    });
			var data = {
				"username": username,
				"password": password
			};
			return $http.post('http://95.85.41.38:8087/auth/login', data)
		};

		function sendGetRequest(url, data) {
			var rootUrl = 'http://95.85.41.38:8087'
			var req = {
				method: 'GET',
				url: rootUrl + url,
				headers: {
					'Authorization': getAuthorizationCookie()
				},
				data: data
			};
			console.log("Req: ", req);
			return $http(req);
		};

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
			return $q(function(resolve, reject){
				resolve({
				  "id": null,
				  "ad": "VOLKAN",
				  "soyad": "TOKMAK",
				  "sicilNo": "002778",
				  "lisansUnvan": "Bilgisayar Mühendisi",
				  "email": "volkan@tokmak.org",
				  "cepTelNo": null,
				  "evTelNo": null,
				  "fotograf": null,
				  "iletisimAdresi": "BARBAROS MAH. BİLLUR SK. TEV A. DALLI APT. BLOK  NO: 13  İÇ KAPI NO: 11 ÇANKAYA / ANKARA",
				  "emailGonderimIzni": true,
				  "smsGonderimIzni": true,
				  "postaGonderimIzni": true,
				  "pushGonderimIzni": false
				});
			});
		};

		function getSubscriptionInfo() {
			return sendGetRequest('/subscription/info');
		};

		function getSubscriptionDebt() {
			return sendGetRequest('/subscription/debt');
		};
		
		function getSubscriptionReceiptList() {
			return sendGetRequest('/subscription/receipt/list');
		};


		return service;
	};

	UyeService.$inject = ['$http', '$q', '$cookies']

	return module;
});
