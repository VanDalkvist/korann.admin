(function () {
    'use strict';

    // products Module
    ng.module('korann.products', [])
        .service('Product', [
            '$resource',
            function ($resource) {
                // todo: create PUT method support
                return $resource('/api/product/:id', {
                    id: '@id'
                }, {
                    update: { method: 'PUT' }
                });
            }
        ]);
})();