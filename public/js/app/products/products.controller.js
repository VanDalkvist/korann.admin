(function (app) {
    'use strict';

    // 
    app.classy.controller({
        name: 'ProductsController',
        inject: [ '$scope', 'Products' ],

        // #region model

        model: {
            products: []
        },

        // #region initialization

        init: function () {
            this.$.model = {
                products: this.Products.query()
            };
        }

        // #region public functions

        // #region private functions (_ prefixed)

    });
})(app);