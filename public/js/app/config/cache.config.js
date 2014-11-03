(function () {
    'use strict';


    angular
        .module('korann.config.cache')
        .config(_config);

    _config.$inject = ['cacheProvider'];

    function _config(cacheProvider) {
        cacheProvider.init("sessionStorage");
    }
})();