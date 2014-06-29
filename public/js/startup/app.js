(function () {
    'use strict';

    var app = angular.module('korann.admin', [
        'ngRoute', 'ngCookies', 'classy', 'ui.router',
        'korann.user', 'korann.config'
    ]);

    window.app = app;

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