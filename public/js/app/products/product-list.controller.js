(function (app) {
    'use strict';

    app.controller('ProductListController', ProductListController);

    ProductListController.$inject = ['$scope', '$log', 'Dialog', 'Product'];

    function ProductListController($scope, $log, Dialog, Product) {

        // #region initialization

        ng.extend($scope, {
            model: {
                products: Product.query(),
                refresh: _refresh,
                remove: _remove,
                edit: _edit,
                create: _create
            }
        });

        // #region public functions

        // #region private functions

        function _refresh() {
            $scope.model.products = Product.query();
        }

        function _remove(product) {
            var result = confirm("Вы уверены?");

            if (!result) return;

            Product.remove({id: product._id}, _refresh);
        }

        function _edit(product) {
            Dialog
                .open('product-details', product, {title: 'Редактирование продукта'})
                .then(function (result) {
                    Product.update({id: result.item._id}, result.item, _refresh);
                });
        }

        function _create() {
            Dialog
                .open('product-details', new Product(), {title: 'Создание продукта'})
                .then(function (result) {
                    result.item.$save(function (created) {
                        $scope.model.products.push(created);
                    });
                });
        }
    }
})(app);