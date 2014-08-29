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
                                templateUrl: '/views/pages/product-list.html',
                                controller: 'ProductListController'
                            }
                        }
                    })
                    .state('dashboard.categories', {
                        url: '/categories',
                        views: {
                            'work@dashboard': {
                                templateUrl: '/views/pages/category-list.html',
                                controller: 'CategoryListController'
                            }
                        },
//                        resolve: {
//                            categories: ['Category', function (Category) {
//
//                                function refresh() {
//                                    return Category.query().$promise.then(function (result) {
//                                        var hash = _.indexBy(result, '_id');
//                                        hash.__proto__.refresh = refresh;
//                                        return hash;
//                                    });
//                                }
//
//                                return refresh();
//                            }]
//                        }
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