(function (module) {
    'use strict';

    module.service("Dialog", ['$rootScope', '$modal', 'dialogMap',
        function ($rootScope, $modal, dialogMap) {
            return {
                open: function (id, data, options) {
                    var dialogContext = dialogMap[id];

                    var scope = ng.extend($rootScope.$new(), { options: options });
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
    ]);

    module.constant("dialogMap",
        (function () {
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
        })()
    );
})(ng.module('korann.modal', []));