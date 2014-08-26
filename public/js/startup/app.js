(function () {
    'use strict';

    var app = angular.module('korann.admin', [
        'ngResource', 'ngCookies', 'classy', 'ui.router',
        'korann.user', 'korann.config', 'korann.products', 'korann.categories', 'korann.modal',
        'ui.bootstrap', "ui.bootstrap.tpls"
    ]);

    window.app = app;
    window.ng = angular;

    app.run([
        '$rootScope', '$state', 'userService',
        function ($rootScope, $state, userService) {

            userService.current().then(function (result) {
                if (!result) return;

                $rootScope.user = {
                    username: result.username
                };
            });
        }
    ]);
})();