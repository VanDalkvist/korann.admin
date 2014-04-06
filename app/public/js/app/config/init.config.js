(function () {
    'use strict';

    // internal modules
    angular.module('korann.config.interceptors', []);
    angular.module('korann.config.route', []);

    angular.module('korann.config', ['korann.config.interceptors', 'korann.config.route']);
})();