(function () {
    'use strict';

    ng.module('korann.products', ['korann.categories'])
        .service('Product', productsResource);

    productsResource.$inject = ['$resource'];

    function productsResource($resource) {
        return $resource('/api/product/:id', {
            id: '@id'
        }, {
            update: {method: 'PUT'}
        });
    }
})();