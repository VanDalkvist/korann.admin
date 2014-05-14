(function () {
    'use strict';

    angular.module('korann.config.route')
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

            //The routes that our angular app will handle
            $routeProvider
                .when('/', { templateUrl: '/views/index.html', controller: 'IndexCtrl' })
                .when('/login', { templateUrl: '/views/shared/login.html', controller: 'LoginCtrl' })
                .otherwise({ redirectTo: '/' });

            //turn on Html5 history mode
            $locationProvider.html5Mode(true);
        }]);
})();