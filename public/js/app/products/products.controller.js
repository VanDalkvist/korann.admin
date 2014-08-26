(function (app) {
    'use strict';

    // todo: add module
    app.controller('ProductsController', [
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
                product.$remove(function () {
                    // todo: delete from list
                    _refresh();
                });
            }

            function _create() {
                Dialog.open('product-create', new Product()).then(function (created) {
                    created.$save();
                });
            }

            function _edit(product) {
                Dialog.open('product-edit', product).then(function (updated) {
                    Product.update({ id: updated.item._id }, updated.item, function () {
                        // todo: updated notification
                        $log.debug("product updated");
                        _refresh();
                    });
                });
            }
        }
    ]);
})(app);