(function () {
    'use strict';

    // internal modules
    angular.module('korann.config.auth', []);
    angular.module('korann.config.http', []);
    angular.module('korann.config.routes', []);
    angular.module('korann.config.cache', ['korann.cache']);

    angular.module('korann.config', [
        'korann.config.auth', 'korann.config.http', 'korann.config.routes', 'korann.config.cache'
    ]);
})();