(function () {
    'use strict';

    angular.module('korann.config.cache')
        .config(['cacheProvider', function (cacheProvider) {
            cacheProvider.init("sessionStorage");
        }]);
})();