(function (module) {
    'use strict';

    module.service('Product', productsResource);

    productsResource.$inject = ['$resource'];

    function productsResource($resource) {
        return $resource('/api/product/:id', {
            id: '@id'
        }, {
            update: {method: 'PUT'}
        });
    }
})(app);