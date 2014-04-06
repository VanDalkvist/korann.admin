(function () {
    'use strict';

    var app = angular.module('korann.admin', [
        'ngRoute', 'ngCookies',
        'korann.user', 'korann.config'
    ]);

    window.app = app;

    app.run(['$rootScope', 'userService', function ($rootScope, userService) {
        var savedUser = userService.current();

        if (!savedUser) return;

        $rootScope.user = {
            username: savedUser.username
        };
    }]);
})();