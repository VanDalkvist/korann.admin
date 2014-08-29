(function (app) {
    'use strict';

    // todo: add module
    app.controller('ProductListController', [
        '$scope', '$modal', '$log', 'Dialog', 'Product',
        function ($scope, $modal, $log, Dialog, Product) {
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
                Product.remove({ id: product._id }, function () {
                    _refresh();
                });
            }

            function _create() {
                Dialog.open('product-details', new Product(), { title: 'Создание продукта' }).then(function (result) {
                    result.item.$save();
                });
            }

            function _edit(product) {
                Dialog.open('product-details', product, { title: 'Редактирование продукта' }).then(function (updated) {
                    Product.update({ id: updated.item._id }, updated.item, function () {
                        $log.debug("product updated");
                        _refresh();
                    });
                });
            }
        }
    ]);
})(app);