(function () {
    'use strict';

    angular.module('korann.config.routes')
        .config([
            '$locationProvider', '$stateProvider', '$urlRouterProvider',
            function ($locationProvider, $stateProvider, $urlRouterProvider) {

                //turn on Html5 history mode
                $locationProvider.html5Mode(true);

                $urlRouterProvider.otherwise('/dashboard/panel');

                $stateProvider
                    .state('root', {
                        url: '',
                        abstract: true,
                        templateUrl: '/views/layouts/board.html'
                    });

                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        parent: 'root',
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
                                controller: 'DashboardController'
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
                    })
                    .state('dashboard.categories', {
                        url: '/categories',
                        views: {
                            'work@dashboard': {
                                templateUrl: '/views/pages/categories.html',
                                controller: 'CategoriesController'
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