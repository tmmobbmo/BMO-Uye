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
        $scope.isCreditCardScreen = false;
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
            Uye.logout().then(function successCallback(response) {
              Uye.deleteAuthorizationCookie();
              $location.path('/');
            }, function errorCallback(response) {
              console.log(response);
            });
        };

        $scope.setAidatCount = function(aidatCountForm) {
            var aidatCount = aidatCountForm.aidatCount.$modelValue;
            Uye.sendGarantiPaymentRequest(aidatCount).then(function successCallback(response) {
                console.log("Response from initiate: ", response.data);
                $scope.txnAmount = response.data.amount;
                $scope.customerIpAddress = response.data.customerIpAddress;
                $scope.customerMailAdress = response.data.customerMailAddress;
                $scope.orderId = response.data.orderId
                $scope.secureHash = response.data.secure3dhash;
                $scope.terminalMerchantId = response.data.terminalMerchantId;
                $scope.successUrl = response.data.successUrl;
                $scope.failUrl = response.data.failUrl;
                $scope.terminalUserId = response.data.terminalId;
                $scope.txntimestamp = response.data.txnTime;
                $scope.isCreditCardScreen = true;
            }, function errorCallback(response) {})
            // $scope.secureHash = sha1Hash(hashData).toUpperCase();
            // console.log("hash: ", $scope.secureHash);
        }

        $scope.initiatePaymentRequest = function(ccForm) {
            var ccNumber = ccForm.ccNumber.$modelValue;
            var ccCvc = ccForm.ccCvc.$modelValue;
            var ccExpMonth = ccForm.ccExpMonth.$modelValue;
            var ccExpYear = ccForm.ccExpYear.$modelValue;
            console.log("Values: ", ccNumber, ccCvc, ccExpMonth, ccExpYear);

        };
        ////////////////////////////////////
        function sha1Hash(msg)
        {
            // constants [§4.2.1]
            var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];


            // PREPROCESSING

            msg += String.fromCharCode(0x80); // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

            // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
            var l = msg.length/4 + 2;  // length (in 32-bit integers) of msg + ‘1’ + appended length
            var N = Math.ceil(l/16);   // number of 16-integer-blocks required to hold 'l' ints
            var M = new Array(N);
            for (var i=0; i<N; i++) {
                M[i] = new Array(16);
                for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
                    M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                              (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
                }
            }
            // add length (in bits) into final pair of 32-bit integers (big-endian) [5.1.1]
            // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
            // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
            M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
            M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

            // set initial hash value [§5.3.1]
            var H0 = 0x67452301;
            var H1 = 0xefcdab89;
            var H2 = 0x98badcfe;
            var H3 = 0x10325476;
            var H4 = 0xc3d2e1f0;

            // HASH COMPUTATION [§6.1.2]

            var W = new Array(80); var a, b, c, d, e;
            for (var i=0; i<N; i++) {

                // 1 - prepare message schedule 'W'
                for (var t=0;  t<16; t++) W[t] = M[i][t];
                for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

                // 2 - initialise five working variables a, b, c, d, e with previous hash value
                a = H0; b = H1; c = H2; d = H3; e = H4;

                // 3 - main loop
                for (var t=0; t<80; t++) {
                    var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
                    var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
                    e = d;
                    d = c;
                    c = ROTL(b, 30);
                    b = a;
                    a = T;
                }

                // 4 - compute the new intermediate hash value
                H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
                H1 = (H1+b) & 0xffffffff;
                H2 = (H2+c) & 0xffffffff;
                H3 = (H3+d) & 0xffffffff;
                H4 = (H4+e) & 0xffffffff;
            }

            return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
        }

        //
        // function 'f' [§4.1.1]
        //
        function f(s, x, y, z)
        {
            switch (s) {
            case 0: return (x & y) ^ (~x & z);           // Ch()
            case 1: return x ^ y ^ z;                    // Parity()
            case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
            case 3: return x ^ y ^ z;                    // Parity()
            }
        }

        //
        // rotate left (circular left shift) value x by n positions [§3.2.5]
        //
        function ROTL(x, n)
        {
            return (x<<n) | (x>>>(32-n));
        }

        //
        // extend Number class with a tailored hex-string method
        //   (note toString(16) is implementation-dependant, and
        //   in IE returns signed numbers when used on full words)
        //
        Number.prototype.toHexStr = function()
        {
            var s="", v;
            for (var i=7; i>=0; i--) { v = (this>>>(i*4)) & 0xf; s += v.toString(16); }
            return s;
        }

        function hashGenerate(){
            //terminalId + orderid + amount + okurl + failurl + islemtipi + taksit + storekey + provUser.getPasswordText()
            console.log("Hededededede");
            var hash = sha1Hash("030691297" +
                            "0000000001405"+
                            "1250"+
                            "https://www.google.com"+
                            "https://www.twitter.com"+
                            "sales"+
                            ""+
                            "12345678"+
                            "123qweASD").toUpperCase();

            console.log("Hash: ", hash);

            return hash;

        }
        /////////////////////////////////////
    };

    function YesNoFilter() {
        return function (boolean) {
            return boolean ? 'Yes' : 'No';
        };
    }

    return module
});
