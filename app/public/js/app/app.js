(function () {
    'use strict';

    var app = angular.module('korann.admin', ['ngRoute', 'korann.user', 'korann.config']);

    window.app = app;

    app.run(['$rootScope', '$http', '$location',
        function ($rootScope, $http, $location) {

            //global object representing the user who is logged in
            $rootScope.user = {};

            //as the app spins up, let's check to see if we have an active session with the server
//            $http.get('/user')
//                .success(function (data) {
//                    $rootScope.user.username = data.username;
//                })
//                .error(function (data) {
//                });
//
//            //global function for logging out a user
//            $rootScope.logout = function () {
//                $rootScope.user = {};
//                $http.post('user/logout', {});
//                $location.path('/');
//            }
        }]);
})();