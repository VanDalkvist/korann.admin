(function () {
    'use strict';

    var required = [
        'ngResource',
        'ngCookies',
        'ui.router',
        'korann.user',
        'korann.config',
        'korann.products',
        'korann.categories',
        'korann.modal',
        'ui.bootstrap',
        'ui.bootstrap.tpls'
    ];
    var app = angular.module('korann.admin', required);

    window.app = app;
    window.ng = angular;

    app.run([
        '$rootScope', '$state', 'userService',
        function ($rootScope, $state, userService) {

            userService.current().then(function (result) {
                if (!result) return;

                $rootScope.user = { username: result.username };
            });
        }
    ]);
})();