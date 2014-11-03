(function (module) {
    'use strict';

    module.service("Dialog", dialogService);
    module.constant("dialogMap", dialogMap());

    function dialogMap() {
        return {
            'product-details': {
                controller: 'ProductDetailsController',
                templateUrl: '/views/widgets/product-details.html'
            },
            'category-details': {
                controller: 'CategoryDetailsController',
                templateUrl: '/views/widgets/category-details.html'
            }
        };
    }

    dialogService.$inject = ['$rootScope', '$modal', 'dialogMap'];

    function dialogService($rootScope, $modal, dialogMap) {
        return {
            open: function (id, data, options) {
                var dialogContext = dialogMap[id];

                var scope = ng.extend($rootScope.$new(), {options: options});
                return $modal.open({
                    templateUrl: dialogContext.templateUrl,
                    controller: dialogContext.controller,
                    scope: scope,
                    resolve: {
                        data: function () {
                            return ng.copy(data);
                        }
                    }
                }).result;
            }
        };
    }
})(ng.module('korann.modal', []));