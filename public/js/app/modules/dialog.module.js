(function (module) {
    'use strict';

    module.service("Dialog", ['$rootScope', '$modal', 'dialogMap',
        function ($rootScope, $modal, dialogMap) {
            return {
                open: function (id, data) {
                    var dialogContext = dialogMap[id];

                    var scope = ng.extend($rootScope.$new(), { title: dialogContext.title });
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
                'product-create': {
                    controller: 'ProductCreateController',
                    templateUrl: '/views/widgets/product-edit.html',
                    title: 'Создание продукта'
                },
                'product-edit': {
                    controller: 'ProductCreateController',
                    templateUrl: '/views/widgets/product-edit.html',
                    title: 'Редактирование продукта'
                },
                'category-create': {
                    controller: 'CategoryCreateController',
                    templateUrl: '/views/widgets/category-edit.html',
                    title: 'Создание категории'
                },
                'category-edit': {
                    controller: 'CategoryCreateController',
                    templateUrl: '/views/widgets/category-edit.html',
                    title: 'Редактирование категории'
                }
            };
        })()
    );
})(ng.module('korann.modal', []));