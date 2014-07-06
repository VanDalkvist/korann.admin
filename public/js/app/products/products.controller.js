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
            this.$modal.open({
                templateUrl: '/views/widgets/product-edit.html',
                resolve: {
                    data: function () {
                        return model;
                    }
                }
            });
        },
        create: function () {
            this.$.createModel.$save();
        }

        // #region private functions (_ prefixed)

    });
})(app);