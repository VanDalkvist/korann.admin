(function () {
    'use strict';

    angular.module('korann.config.route')
        .config([
            '$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
            function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

                //turn on Html5 history mode
                $locationProvider.html5Mode(true);

                //The routes that our angular app will handle
//                $routeProvider
//                    .when('/', { templateUrl: '/views/index.html', controller: 'IndexCtrl' })
//                    .when('/login', { templateUrl: '/views/shared/login.html', controller: 'LoginCtrl' })
//                    .otherwise({ redirectTo: '/' });

                $urlRouterProvider.otherwise('/main');

                $stateProvider
                    .state('home', {
                        url: '',
                        abstract: true,
                        templateUrl: '/views/index.html',
                        controller: 'MainCtrl'
                    })
                    .state('home.main', {
                        url: '/main',
                        templateUrl: '/views/pages/main.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: '/views/shared/login.html',
                        controller: 'LoginCtrl'
                    })
            }
        ]);
})();