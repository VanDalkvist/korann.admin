(function () {
    'use strict';

    angular.module('korann.config.route')
        .config([
            '$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
            function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

                //turn on Html5 history mode
                $locationProvider.html5Mode(true);

                $urlRouterProvider.otherwise('/dashboard/panel');

                $stateProvider
                    .state('main', {
                        url: '',
                        abstract: true,
                        templateUrl: '/views/layouts/board.html'
                    });

                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        parent: 'main',
                        abstract: true,
                        controller: 'IndexController',
                        views: {
                            'sidebar': {
                                templateUrl: '/views/widgets/sidebar.html',
                                controller: 'SidebarController'
                            },
                            'main': {
                                templateUrl: '/views/layouts/work-panel.html'
                            }
                        }
                    })
                    .state('dashboard.panel', {
                        url: '/panel',
                        views: {
                            'work@dashboard': {
                                templateUrl: '/views/pages/welcome.html',
                                controller: 'IndexController'
                            }
                        }
                    })
                    .state('dashboard.products', {
                        url: '/products',
                        views: {
                            'work@dashboard': {
                                templateUrl: '/views/pages/products.html',
                                controller: 'ProductsController'
                            }
                        }
                    });

                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: '/views/shared/login.html',
                        controller: 'LoginController'
                    });
            }
        ]);
})();