(function (app) {
    'use strict';

    // 
    app.classy.controller({
        name: 'ProductsController',
        inject: [ '$scope', 'Product', '$modal' ],

        // #region model

        model: {
            products: []
        },

        // #region initialization

        init: function () {
            this.$.model = {
                products: this.Product.query()
            };
        },

        // #region public functions

        refresh: function () {
            this.$.model.products = this.Product.query();
        },
        save: function (product) {
            product.$update();
        },
        edit: function (product) {
            this.$modal.open({
                templateUrl: '/views/widgets/product-edit.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    data: function () {
                        return ng.copy(product);
                    }
                }
            });
        },
        remove: function (product) {
            product.$remove();
        },
        new: function () {
            var model = this.$.createModel = new this.Product();
            var modalInstance = this.$modal.open({
                templateUrl: '/views/widgets/product-edit.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    data: function () {
                        return model;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
//                $scope.selected = selectedItem;
            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
            });
        },
        create: function () {
            this.$.createModel.$save();
        }

        // #region private functions (_ prefixed)

    });
})(app);

var ModalInstanceCtrl = function ($scope, $modalInstance, data) {

    $scope.model = data;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};