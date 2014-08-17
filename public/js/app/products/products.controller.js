(function (app) {
    'use strict';

    // todo: add module
    app.controller('ProductsController', [
        '$scope', 'Product', '$modal', '$log',
        function ($scope, Product, $modal, $log) {
            // #region initialization

            $scope.model = {
                products: Product.query()
            };

            // #region public functions

            $scope.refresh = function refresh() {
                $scope.model.products = Product.query();
            };
            $scope.save = function save(product) {
                product.$update();
            };
            $scope.edit = function edit(product) {
                var modalInstance = $modal.open({
                    templateUrl: '/views/widgets/product-edit.html',
                    controller: 'ProductCreateController',
                    resolve: {
                        data: function () {
                            return ng.copy(product);
                        },
                        mode: function () {
                            return 'edit';
                        }
                    }
                });
                modalInstance.result.then(function (updated) {
                    Product.update({ id: updated.item._id }, updated.item, function () {
                        // todo: updated notification
                        $log.debug("product updated");
                    });
                })
            };
            $scope.remove = function remove(product) {
                product.$remove();
            };
            $scope.newProduct = function newProduct() {
                $scope.createModel = new Product();
                var modalInstance = $modal.open({
                    templateUrl: '/views/widgets/product-edit.html',
                    controller: 'ProductCreateController',
                    resolve: {
                        data: function () {
                            return $scope.createModel;
                        },
                        mode: function () {
                            return 'create';
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //                $scope.selected = selectedItem;
                });
            };

            $scope.create = function create() {
                $scope.createModel.$save();
            };

            // #region private functions (_ prefixed)
        }
    ]);
})(app);