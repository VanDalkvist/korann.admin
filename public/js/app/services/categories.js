(function (module) {
    'use strict';

    module.service('Category', categoryResource);

    categoryResource.$inject = ['$resource'];

    function categoryResource($resource) {
        return $resource('/api/category/:id', {
            id: '@id'
        }, {
            update: {method: 'PUT'}
        });
    }

})(app);