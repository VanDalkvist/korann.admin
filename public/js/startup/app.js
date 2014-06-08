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
            var currentUser = userService.current();

            if (!currentUser) delete $rootScope.user;
        }
    ]);
})();