(function () {
    'use strict';

    var app = angular.module('korann.admin', [
        'ngRoute', 'ngCookies',
        'korann.user', 'korann.config'
    ]);

    window.app = app;
})();