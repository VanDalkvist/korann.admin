(function () {
    'use strict';

    var requiredModules = [
        'ngResource',
        'ngCookies',
        'ui.router',
        'korann.config',
        'korann.modal',
        'ui.bootstrap',
        'ui.bootstrap.tpls'
    ];
    var app = angular.module('korann.admin', requiredModules);

    window.app = app;
    window.ng = angular;

    app.run(_run);

    _run.$inject = ['$rootScope', 'userService'];

    function _run($rootScope, userService) {

        userService
            .current()
            .then(function (result) {
                if (!result) return;

                $rootScope.user = {username: result.username};
            });
    }
})();