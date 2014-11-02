(function (app) {
    'use strict';

    // todo: add module
    ProductListController.$inject = ['$scope', '$modal', '$log', 'Dialog', 'Product'];
    app.controller('ProductListController', ProductListController);

    function ProductListController($scope, $modal, $log, Dialog, Product) {

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

        function _create() {
            Dialog.open('product-details', new Product(), {title: 'Создание продукта'}).then(function (result) {
                result.item.$save(function () {
                    _refresh();
                });
            });
        }

        function _edit(product) {
            Dialog.open('product-details', product, {title: 'Редактирование продукта'}).then(function (updated) {
                Product.update({id: updated.item._id}, updated.item, function () {
                    $log.debug("product updated");
                    _refresh();
                });
            });
        }
    }
})(app);