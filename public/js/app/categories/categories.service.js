(function () {
    'use strict';

    ng.module('korann.categories', [])
        .service('Category', [
            '$resource',
            function ($resource) {
                return $resource('/api/category/:id', {
                    id: '@id'
                }, {
                    update: { method: 'PUT' }
                });
            }
        ]);
})();