(function () {
    'use strict';

    // internal modules
    angular.module('korann.config.auth', []);
    angular.module('korann.config.http', []);
    angular.module('korann.config.route', []);
    angular.module('korann.config.cache', ['korann.cache']);

    angular.module('korann.config', [
        'korann.config.auth', 'korann.config.http', 'korann.config.route', 'korann.config.cache'
    ]);
})();