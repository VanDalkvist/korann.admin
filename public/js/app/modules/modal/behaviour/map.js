(function () {
    'use strict';

    /**
     * korann.modal Module
     */
    ng.module('korann.modal')
        .constant("modalMap", (function () {
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
})();